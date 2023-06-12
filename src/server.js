const express = require("express");
const mongoose = require("mongoose");
const tableRoutes = require("./routes/tableRoutes");
const dotenv = require("dotenv");
dotenv.config();

const app = express();

const port = process.env.PORT || 3000;
const mongoURI = process.env.MONGO_URI || "";

// CONNECT TO THE MONGODB DATABASE
mongoose
  .connect(
    "mongodb+srv://muwaffaq:Donfaqzy1976@spreadsheetcluster.lrnylpv.mongodb.net/spreadApp"
  )
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.error("Failed to connect to MongoDB", error);
  });

app.use(express.json());

// ROUTES
app.use("api/tables", tableRoutes);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
