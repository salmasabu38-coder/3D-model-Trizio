const express = require('express');
const app = express();
const database = require('./db');
const bodyparser = require('body-parser');
const cors = require('cors');
const router = require('./router');
const path = require('path');


// Allow Frontend domain
app.use(cors({
  origin: [
    "https://threed-model-trizio-1.onrender.com",
    "http://localhost:4000"
  ],
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE"]
}));

// Middlewares
app.use(bodyparser.json());

// Routes
app.use('/', router);

// Serve uploads publicly
app.use('/uploads', express.static(path.join(__dirname, 'Uploads')));

// Required for Render Deployment
const PORT = process.env.PORT || 4000;


// Start Server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
