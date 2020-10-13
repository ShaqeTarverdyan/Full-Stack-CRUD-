const express = require('express');
const { body } = require('express-validator');
const router = express.Router();
const Admin = require('../models/admin');
const adminController = require('../controllers/admin');

router.post(
    '/admin', 
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
            .withMessage('Please enter a valid email')
            .normalizeEmail(),
        body('password')
            .trim()
            .isLength({ min: 3 })
            .withMessage('must be at least 6 chars long')
            .notEmpty(),
        body('role')
            .trim()
            .notEmpty()
    ],
    adminController.registerNewAdmin);
router.get('/admins', adminController.getAdmins);
router.get('/admin/:adminId', adminController.getAdmin);
router.put(
    '/admin/:adminid', 
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
    adminController.updateAdmin
);
router.delete('admin/:adminId', adminController.deleteAdmin)
router.post('/login', adminController.loginAdmin)

module.exports = router;