const mongoose = require('mongoose');

const DataSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    author: {
      type: String,
      required: true,
    },
    date: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
    from: {
      type: String,
      enum: ['oxford', 'doaj'],
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const dataModel = mongoose.model('dataModel', DataSchema);
module.exports = dataModel;
