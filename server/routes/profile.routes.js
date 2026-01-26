import express from 'express';
import profileController from '../controllers/profile.controller.js';
import authCtrl from '../controllers/auth.controller.js';

const router = express.Router();

// POST - Create profile (requires authentication)
router.post('/profile', authCtrl.requireSignin, profileController.createProfile); // POST /api/profile

// GET - Get profile by userId (public)
router.get('/profile/users/:userId', profileController.getProfileById); // GET /api/profile/users/:userId

// GET - Get all profiles (public)
router.get('/profile', profileController.getProfiles); // GET /api/profile

// PUT - Update profile (requires authentication)
router.put('/profile/users/:userId', authCtrl.requireSignin, profileController.updateProfile); // PUT /api/profile/users/:userId

// DELETE - Delete profile (requires authentication)
router.delete('/profile/users/:userId', authCtrl.requireSignin, profileController.deleteProfile); // DELETE /api/profile/users/:userId

export default router; 