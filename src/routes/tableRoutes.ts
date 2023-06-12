import express from 'express'
import { createTable, getTables, deleteTable } from '../controllers/TableController'

const router = express.Router();

router.post('/', createTable);
router.get('/', getTables);
router.delete('/:id', deleteTable)

export default router