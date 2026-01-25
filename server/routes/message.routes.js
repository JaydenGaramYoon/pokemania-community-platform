import express from 'express';
import messageCtrl from '../controllers/message.controller.js';
import authCtrl from '../controllers/auth.controller.js';

const router = express.Router();

const optionalAuth = (req, res, next) => {
  const token = req.cookies?.t || 
    (req.headers.authorization && req.headers.authorization.startsWith('Bearer ') 
      ? req.headers.authorization.split(' ')[1] 
      : null);
  
  if (token) {
    authCtrl.requireSignin(req, res, (err) => {
      if (err) {
        console.log('Token verification failed:', err.message);
      }
      next();
    });
  } else {
    next();
  }
};

router.route('/api/messages')
  .get(messageCtrl.getMessagesBySection)
  .post(optionalAuth, messageCtrl.createMessage);


router.route('/api/messages/:messageId')
  .delete(messageCtrl.deleteMessage)
  .put(messageCtrl.editMessage);

export default router;