import mongoose from 'mongoose';

const messageSchema = new mongoose.Schema({
  section: String,
<<<<<<< HEAD
  sender: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
>>>>>>> 7956e01 (Fix sender field to use ObjectId FK to User model)
  message: String,
  timestamp: { type: Date, default: Date.now }
});

const Message = mongoose.model('Message', messageSchema);
export default Message;