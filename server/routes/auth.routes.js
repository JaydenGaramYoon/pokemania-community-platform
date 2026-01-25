import express from 'express'
import authCtrl from '../controllers/auth.controller.js' 
const router = express.Router()
router.route('/api/auth/signin').post(authCtrl.signin) //POST request to authenticate the user with their email and password
router.route('/api/auth/signout').get(authCtrl.signout) //GET request to clear the cookie containing a JWT that was set on the response object after sign-in

export default router

