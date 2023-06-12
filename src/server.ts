import express, { Express } from 'express'
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import tableRoutes from './routes/tableRoutes'

dotenv.config();

const app: Express = express();

const port = process.env.PORT || 3000;
const mongoURI = process.env.MONGO_URI || '';

mongoose
.connect(mongoURI)
.then(() => {
  console.log('Connected to MongoDB')
})
.catch((error) => {
  console.error('Failed to connect to MongoDB', error);
});

app.use(express.json());

app.use('api/tables', tableRoutes);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`)
})