// const path = require('path');
const express = require('express');
const router = express.Router();

const adminController = require('../controllers/admin');

router.post('/register', (req, res) => {
    console.log('routes ', res)
    
});
router.get('/register', adminController.registerNewAdmin);

module.exports = router;