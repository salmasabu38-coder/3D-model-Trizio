const express = require('express');
const app = express();
const database = require('./db');
const bodyparser = require('body-parser');
const cors = require('cors');
const router = require('./router');
const path = require('path');

// CORS setup
app.use(cors({
  origin: [
    "https://threed-model-trizio-1.onrender.com",
    "http://localhost:3000"
  ],
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE"]
}));

// Middlewares
app.use(bodyparser.json());

// Routes
app.use('/', router);

// Serve uploads folder
app.use('/uploads', express.static(path.join(__dirname, 'Uploads')));

// Optional test route for uploads
app.get('/uploads/:filename', (req, res) => {
  const options = { root: path.join(__dirname, 'Uploads') };
  res.sendFile(req.params.filename, options, (err) => {
    if (err) {
      console.log(err);
      res.status(404).send('File not found');
    }
  });
});

// Server
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

