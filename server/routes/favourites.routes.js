import express from 'express';
import favouritesController from '../controllers/favourites.controller.js';
import authCtrl from '../controllers/auth.controller.js';

const router = express.Router();

// POST - Create favourite (requires authentication)
router.post('/favourites', authCtrl.requireSignin, favouritesController.createFavourite); // POST /api/favourites

// GET - List all favourites (public)
router.get('/favourites', favouritesController.listFavourites); // GET /api/favourites

// GET - Get favourite by ID (public)
router.get('/favourites/:favouriteId', favouritesController.getFavouritesById); // GET /api/favourites/:favouriteId

// GET - Get favourites by user (public)
router.get('/favourites/users/:userId', favouritesController.getFavouritesByUser);

// DELETE - Remove favourite (requires authentication)
router.delete('/favourites/:userId/:pokemonId', authCtrl.requireSignin, favouritesController.removeFavouriteById);

// PUT - Update favourite (requires authentication)
router.put('/favourites/:userId/:pokemonId', authCtrl.requireSignin, favouritesController.updateFavourite);

export default router;