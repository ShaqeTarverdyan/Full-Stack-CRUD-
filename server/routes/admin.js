// const path = require('path');
const express = require('express');
const { body } = require('express-validator/check');
const router = express.Router();

const adminController = require('../controllers/admin');

router.post(
    '/register', 
    [
        body('firstname')
            .trim()
            .notEmpty(),
        body('lastname')
            .trim()
            .notEmpty(),
        body('email')
            .trim()
            .isEmail()
            .notEmpty(),
        body('password')
            .isLength({ min: 6 })
            .withMessage('must be at least 6 chars long')
            .notEmpty(),
        body('role')
            .trim()
            .notEmpty()
    ],
    adminController.registerNewAdmin);
router.get('/register', adminController.getAdmins);
router.post('/login', adminController.loginAdmin)

module.exports = router;