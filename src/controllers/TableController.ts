import { Request, Response } from 'express'
import Table, { TableDocument } from '../models/TableModel'

export const createTable = async (req: Request, res: Response) => {
  try {
    const { name, columns, rows } = req.body;
    const table = new Table({ name, columns, rows})
    await table.save();
    res.status(200).json(table);
  } catch (error) {
    console.log(error);
    res.status(500).json({message: 'Server Error'});
  }
}

export const getTables = async (req: Request, res:Response) => {
  try {
    const tables = await Table.find();
    res.status(200).json(tables); 
  } catch (error) {
    console.error(error);
    res.status(500).json({message: 'Server Error'})
  }
}

export const deleteTable = async (req: Request, res:Response) => {
  try {
    const { id } = req.params;
    await Table.findByIdAndRemove(id);
    res.status(200).json({message: 'Table deleted successfully'})
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
}