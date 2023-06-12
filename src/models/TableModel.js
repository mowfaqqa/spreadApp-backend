const mongoose = require("mongoose");

const TableSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  columns: {
    type: [String],
    required: true,
  },
  rows: {
    type: [mongoose.Schema.Types.Mixed],
    default: [{}],
  },
});

module.exports = mongoose.model("Table", TableSchema);
