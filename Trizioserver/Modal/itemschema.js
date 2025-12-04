const mongoose = require("mongoose");

const itemSchema = new mongoose.Schema({
  name: { 
    type: String, 
    required: true 
},
  filename: { 
    type: String, 
    required: true 
},
  fileId: { 
    type: mongoose.Schema.Types.ObjectId, 
    required: true 
},
userid: { 
  type: mongoose.Schema.Types.ObjectId, 
  ref: "User", 
  required: true 
},
  createdAt: { 
    type: Date, 
    default: Date.now 
},
});

module.exports = mongoose.model("Items", itemSchema);
