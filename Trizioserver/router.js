const express = require('express')
const router = express.Router()
const item = require('./Controller/itemcontroller');
const user = require('./Controller/usercontroller')

router.post('/items', item.uploadItem);
router.get('/allitems', item.getAllItems);
router.get('/file/:id', item.getItemFile);
router.delete('/items/:id', item.deleteItem);
router.post('/register', user.savedata);
router.post('/login', user.login);
router.get('/items/:id', item.viewitem)
router.get("/items/user/:userid", item.getItemsByUser);



module.exports = router