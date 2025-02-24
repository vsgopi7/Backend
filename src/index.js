import express from 'express';
import dotenv from 'dotenv';
import connectDB from './db/index.js'; // Ensure the correct path and file extension

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

connectDB(); // Call the function to connect to the database

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

