const express = require("express");
const router = express.Router();
const Employee = require("../Models/Employee");
const url = require("url");

const operations = {
  GET: {
    "/employee": async (req, res) => {
      try {
        const result = await Employee.find();
        res.status(200).json(result);
      } catch (error) {
        res.status(400).send({ message: error });
      }
    },
    "/employee/:id": async (req, res) => {
      try {
        const result = await Employee.findOne({ _id: req.params.id });
        res.status(200).json(result);
      } catch (error) {
        res.status(400).send({ message: error });
      }
    },
  },
  POST: {
    "/add": async (req, res) => {
      const newEmployee = new Employee({
        name: req.body.name,
        age: req.body.age,
        department: req.body.department,
      });
      try {
        const save = await newEmployee.save();
        res.status(200).json(save);
      } catch (error) {
        res.status(400).send({ message: error });
      }
    },
  },
};

const start = async (req, res) => {
  let method = req.method;
  let params = url.parse(req.url, true);
  let useRoute = operations[method][params.pathname];
  if (useRoute === undefined) {
    res.send("404 not found");
  } else {
    useRoute = operations[method][params.pathname](req, res);
  }
};

router.get("/employee", async (req, res) => {
  start(req, res);
});

router.get("/employee/:id", async (req, res) => {
  try {
    const result = await Employee.findOne({ _id: req.params.id });
    res.status(200).json(result);
  } catch (error) {
    res.status(400).send({ message: error });
  }
});

router.post("/add", async (req, res) => {
  start(req, res);
});

router.delete("/delete/:id", async (req, res) => {
  try {
    const result = await Employee.remove({ _id: req.params.id });
    res.status(200).json(result);
  } catch (error) {
    res.status(400).send({ message: error });
  }
});

router.patch("/update/:id", async (req, res) => {
  try {
    const result = await Employee.updateOne(
      { _id: req.params.id },
      {
        $set: {
          name: req.body.name,
          age: req.body.age,
          department: req.body.department,
        },
      }
    );
    res.status(200).json(result);
  } catch (error) {
    res.status(400).send({ message: error });
  }
});

module.exports = router;
