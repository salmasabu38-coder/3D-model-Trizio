const mongoose = require('mongoose');
require('dotenv').config();

const MONGO_URI = process.env.MONGO_URI;

mongoose.connect(MONGO_URI)
  .then(() => console.log("MongoDB Connected Successfully! 🚀"))
  .catch((err) => console.log("MongoDB Connection Error:", err));


module.exports = mongoose;
