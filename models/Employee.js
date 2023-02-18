const mongoose = require("mongoose");

const EmployeeSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    aadharNumber: {
      type: Number,
      unique: true,
      required: true,
    },
    company_name: {
      type: String,
      required: true,
    },
    department: {
      type: Number,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    country: {
      type: String,
      required: true,
    },
    salary : {
      type : Number,
      required : true
    },
    phone : {
      type : [Number],
      required : true
    },
    dateOfJoining : {
      type : Date,
      required : true
    }
  },
  {
    timestamps: true,
  }
);
module.exports = Employee = mongoose.model("employee", EmployeeSchema);
