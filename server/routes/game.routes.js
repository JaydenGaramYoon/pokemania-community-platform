import express from 'express';
import gameCtrl from '../controllers/game.controller.js';
import authCtrl from '../controllers/auth.controller.js';

const router = express.Router();

// POST - Save game score (requires authentication)
router.route('/api/game').post(authCtrl.requireSignin, gameCtrl.create);

// GET - Get user game scores (requires authentication)
router.route('/api/game/user/:userId').get(authCtrl.requireSignin, gameCtrl.getScore);

// PUT - Update game score (requires authentication)
router.put('/api/game/:gameId', authCtrl.requireSignin, gameCtrl.updateScore);

// DELETE - Delete game score (requires authentication)
router.route('/api/game/:gameId').delete(authCtrl.requireSignin, gameCtrl.removeScore);

export default router;