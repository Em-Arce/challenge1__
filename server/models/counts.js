const mongoose = require("mongoose");

const CountSchema = new mongoose.Schema({
  currentCount: {
    type: Number,
    required: true,
  }
});

const CountModel = mongoose.model("counts", CountSchema);
module.exports = CountModel;