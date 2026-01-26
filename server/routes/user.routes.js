


import express from 'express'
import userCtrl from '../controllers/user.controller.js'
import authCtrl from '../controllers/auth.controller.js'

const router = express.Router()

// userId param resolver - runs before any :userId routes
router.param('userId', userCtrl.userByID)

// List all users and register (signup)
router.route('/')
    .get(authCtrl.requireSignin, authCtrl.isAdmin, userCtrl.list)  // Only admins can list all users
    .post(userCtrl.create)

// Get current logged-in user info
router.get('/me', authCtrl.requireSignin, (req, res) => {
  res.json(req.auth)
})

// Read / update / delete individual user info
router.route('/:userId')
    .get(authCtrl.requireSignin, userCtrl.read)
    .put(authCtrl.requireSignin, authCtrl.hasAuthorization, userCtrl.update)
    .delete(authCtrl.requireSignin, authCtrl.hasAuthorization, userCtrl.remove)

// Change password (admin or owner)
router.route('/:userId/password')
  .put(authCtrl.requireSignin, authCtrl.hasAuthorization, userCtrl.changePassword);
  
// Change role (owner or admin only)
router.route('/:userId/role')
    .put(authCtrl.requireSignin, userCtrl.updateRole)

export default router
