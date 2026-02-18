const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const multer = require('multer');
const path = require('path');

// Multer Storage Configuration
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname);
    }
});

const upload = multer({ storage: storage });

router.post('/register', upload.single('profile'), userController.registerUser);
router.get('/', userController.getUsers);
router.get('/export', userController.exportUsers); // Place before :id to avoid conflict
router.get('/:id', userController.getUserById);
router.put('/:id', upload.single('profile'), userController.updateUser);
router.delete('/:id', userController.deleteUser);

module.exports = router;
