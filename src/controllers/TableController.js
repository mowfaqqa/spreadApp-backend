const Table = require("../models/TableModel");

const createTable = async (req, res) => {
  try {
    const { name, columns, rows } = req.body;
    const table = new Table({ name, columns, rows });
    await table.save();
    res.status(200).json(table);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server Error" });
  }
};

const getTables = async (req, res) => {
  try {
    const tables = await Table.find();
    res.status(200).json(tables);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

const deleteTable = async (req, res) => {
  try {
    const { id } = req.params;
    await Table.findByIdAndRemove(id);
    res.status(200).json({ message: "Table deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

const addRow = async (req, res) => {
  try {
    const { id } = req.params;
    const table = await Table.findById(id);
    if (!table) {
      return res.status(404).json({ message: "Table not found" });
    }
    table.rows.push({});
    await table.save();
    res.status(200).json(table);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

const updateCell = async (req, res) => {
  try {
    const { id, rowIndex, column, value } = req.params;
    const table = await Table.findById(id);
    if (!table) {
      return res.status(404).json({ message: "Table not found" });
    }
    const numberedRowIndex = parseInt(rowIndex);
    table.rows[numberedRowIndex][column] = value;
    await table.save();
    res.status(200).json(table);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

const addColumn = async (req, res) => {
  try {
    const { id } = req.params;
    const { column } = req.body;
    const table = await Table.findById(id);
    if (!table) {
      return res.status(404).json({ message: "Table not found" });
    }
    table.columns.push(column);
    table.rows.forEach((row) => {
      row[column] = "";
    });
    await table.save();
    res.status(200).json(table);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

const deleteColumn = async (req, res) => {
  try {
    const { id, columnIndex } = req.params;
    const table = await Table.findById(id);
    if (!table) {
      return res.status(404).json({ message: "Table not found" });
    }
    const parsedColumnIndex = parseInt(columnIndex);
    const columnToDelete = table.columns[parsedColumnIndex];
    table.columns.splice(parsedColumnIndex, 1);
    table.rows.forEach((row) => {
      delete row[columnToDelete];
    });
    await table.save();
    res.json(table);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

module.exports = {
  createTable,
  getTables,
  deleteTable,
  addRow,
  updateCell,
  addColumn,
  deleteColumn,
};
