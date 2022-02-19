const mongoose = require("mongoose");

const employee = mongoose.Schema({
  name: {
    type: String,
    require: true,
  },
  age: {
    type: Number,
    require: true,
  },
  department: {
    type: String,
    require: true,
  },
});

module.exports = mongoose.model("Employee", employee);
