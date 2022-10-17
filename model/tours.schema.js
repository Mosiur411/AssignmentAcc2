const mongoose = require('mongoose');

const toursSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please enter tour name"],
    trim: true,
    maxLength: [100, "Tour name cannot exceed 100 characters"],
    minLength: [3, "Tour name cannot be less than 3 characters"],
    unique: true,
  },
  description: {
    type: String,
    required: true,
  },
  imageUrl: {
    type: String,
    required: true,
    validate: /((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)/,
  },
  price: {
    type: Number,
    required: true,
    minLength: [0, "Price cannot be less than 0"],
  },
  duration: {
    type: Number,
    required: true,
    min: [0, "Duration cannot be less than 0"],
    max: [23, "Duration cannot be more than 23"],
    validate: {
      validator: Number.isInteger,
      message: "{VALUE} is not an integer value",
    },
  },
  view: {
    type: Number,
    default: 0,
  },
  maxGroupSize: {
    type: Number,
    required: true,
    min: [0, "Max group size cannot be less than 0"],
    validate: {
      validator: Number.isInteger,
      message: "{VALUE} is not an integer value",
    },
  },
  status: {
    type: String,
    required: true,
    enum: {
      values: ["available", "unavailable"],
      message: "Please select the correct status for tour, it must be either available or unavailable",
    },
  },
},
  {
    timestamps: true,
  }
);

// Model
const Tours = mongoose.model('Tours', toursSchema);

module.exports = Tours;
