import express from 'express';
import profileController from '../controllers/profile.controller.js';
import authCtrl from '../controllers/auth.controller.js';

const router = express.Router();

// POST - Create profile (requires authentication)
router.post('/api/profile', authCtrl.requireSignin, profileController.createProfile); // POST /api/profile

// GET - Get profile by userId (public)
router.get('/api/profile/users/:userId', profileController.getProfileById); // GET /api/profile/users/:userId

// GET - Get all profiles (public)
router.get('/api/profile', profileController.getProfiles); // GET /api/profile

// PUT - Update profile (requires authentication)
router.put('/api/profile/users/:userId', authCtrl.requireSignin, profileController.updateProfile); // PUT /api/profile/users/:userId

// DELETE - Delete profile (requires authentication)
router.delete('/api/profile/users/:userId', authCtrl.requireSignin, profileController.deleteProfile); // DELETE /api/profile/users/:userId

export default router; 