const express = require('express');
const router = express.Router();
const UserController = require('../controllers/userController');

// User registration
router.post('/register', UserController.registerUser); 

// User login
router.post('/login', UserController.loginUser);

// User logout
router.post('/logout', UserController.logout);

// Get current user info
router.get('/user-current', UserController.getLogged);

// Update user by ID
router.put('/:id', UserController.updateOne);

// Export router
module.exports = router;


