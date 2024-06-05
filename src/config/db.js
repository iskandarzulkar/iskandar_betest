const mongoose = require('mongoose');
require('dotenv').config();

const URL_DB = process.env.URL_DB;
const DB_NAME = process.env.DB_NAME;
const connectDB = async () => {
  try {
    await mongoose.connect(`${URL_DB}/${DB_NAME}`);
    console.log('MongoDB connected');
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
};

module.exports = connectDB;
