// const path = require('path');
const express = require('express');
const { body } = require('express-validator/check');
const router = express.Router();

const adminController = require('../controllers/admin');

router.post(
    '/register', 
    [
        body('firstname')
            .trim(),
        body('lastname')
            .trim(),
        body('email')
            .trim()
            .isEmail(),
        body('password')
            .isLength({ min: 6 })
            .withMessage('must be at least 6 chars long'),
        body('role')
            .trim()
    ],
    adminController.registerNewAdmin);
router.get('/register', adminController.getAdmins);
router.post('/login', adminController.loginAdmin)

module.exports = router;