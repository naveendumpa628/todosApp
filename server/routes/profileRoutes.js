const express = require('express');
const router = express.Router();
const { getProfile, updateProfile } = require('../controllers/profileController');
const authenticate = require('../middlewares/authMiddleware'); // Middleware to verify JWT token

// Route to get the user's profile (only accessible to authenticated users)
router.get('/', authenticate, getProfile);  // Get the profile information of the logged-in user

// Route to update the user's profile (only accessible to authenticated users)
router.put('/', authenticate, updateProfile);  // Update the profile of the logged-in user

module.exports = router;
