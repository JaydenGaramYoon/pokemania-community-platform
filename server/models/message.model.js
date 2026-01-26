import mongoose from 'mongoose';

const messageSchema = new mongoose.Schema({
  section: String,
  sender: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  message: String,
  timestamp: { type: Date, default: Date.now }
});

const Message = mongoose.model('Message', messageSchema);
export default Message;