const express = require("express");
const {
  createTable,
  getTables,
  deleteTable,
  addRow,
  updateCell,
  addColumn,
  deleteColumn,
} = require("../controllers/TableController");

const router = express.Router();

router.post("/", createTable);
router.get("/", getTables);
router.delete("/:id", deleteTable);
router.post("/:id/rows", addRow);
router.put("/:id/rows/:rowIndex/cells/:column", updateCell);
router.post("/:id/columns", addColumn);
router.delete("/:id/columns/:columnIndex", deleteColumn);

module.exports = router;
