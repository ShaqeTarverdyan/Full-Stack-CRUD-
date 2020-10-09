// const path = require('path');
const express = require('express');
const router = express.Router();

const adminController = require('../controllers/admin');

router.post('/register', adminController.registerNewAdmin);
router.get('/register', adminController.getAdmins);

module.exports = router;