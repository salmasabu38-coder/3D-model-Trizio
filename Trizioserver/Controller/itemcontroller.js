const Item = require('../Modal/itemschema'); 
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const mongoose = require('mongoose');

// Setup multer storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './Uploads'); 
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ storage });

// Upload a new model
const uploadItem = [
  upload.single('file'),
  async (req, res) => {
    try {
      if (!req.file) return res.status(400).json({ error: "No file uploaded" });

      const { name, userid } = req.body; 

      if (!userid) return res.status(400).json({ error: "User ID required" });

      const newItem = new Item({
        name,
        filename: req.file.filename,
        fileId: new mongoose.Types.ObjectId(), 
        userid: new mongoose.Types.ObjectId(req.body.userid)
      });

      await newItem.save();
      res.json({ message: "File uploaded successfully", item: newItem });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Upload failed" });
    }
  }
];

// Get all items
const getAllItems = async (req, res) => {
  try {
    const items = await Item.find().sort({ createdAt: -1 });
    res.json({ items });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get a single item file
const getItemFile = async (req, res) => {
  try {
    const item = await Item.findById(req.params.id);
    if (!item) return res.status(404).json({ error: "Item not found" });

    const filePath = path.join(__dirname, '..', 'Uploads', item.filename);
    if (!fs.existsSync(filePath)) return res.status(404).json({ error: "File not found" });

    res.setHeader('Content-Type', 'model/gltf-binary'); 
    fs.createReadStream(filePath).pipe(res);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const deleteItem = async (req, res) => {
  try {
    const item = await Item.findById(req.params.id);
    if (!item) return res.status(404).json({ error: "Item not found" });

    // Delete the file from disk
    const filePath = path.join(__dirname, '..', 'Uploads', item.filename);
    if (fs.existsSync(filePath)) fs.unlinkSync(filePath);

    // Delete from database
    await Item.findByIdAndDelete(req.params.id);

    res.json({ message: "Item deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Delete failed" });
  }
};

const viewitem = async (req, res) => {
  const { id } = req.params;

  try {
    const item = await Item.findById(id);

    if (!item) {
      return res.status(404).json({ message: "Item not found" });
    }

    res.status(200).json(item);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
}

const getItemsByUser = async (req, res) => {
  try {
    const { userid } = req.params;
    const items = await Item.find({ userid }).sort({ createdAt: -1 });

    res.json({ items });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};

module.exports = { uploadItem, getAllItems, getItemFile, deleteItem, viewitem, getItemsByUser };
