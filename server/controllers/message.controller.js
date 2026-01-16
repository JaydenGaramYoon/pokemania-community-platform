// import Message from '../models/message.model.js';
// import User from '../models/user.model.js';

// export const createMessage = async (req, res) => {
//   const { section, message, sender } = req.body;
  
//   if (!section || !message || !sender) {
//     return res.status(400).json({ error: 'Missing required fields' });
//   }

//   try {
//     // let sender = 'Guest';
//     // if (req.auth && req.auth.name) {
//     //   sender = req.auth.name;
//     // }

//     console.log('Creating message with sender:', sender, 'Auth info:', req.auth);

//     const newMessage = new Message({
//       section,
//       message,
//       sender
//     });

//     const savedMessage = await newMessage.save();
//     res.status(200).json(savedMessage);
//   } catch (err) {
//     console.error('Message save error:', err);
//     res.status(500).json({ error: 'Failed to save message' });
//   }
// };

// export const getMessagesBySection = async (req, res) => {
//   const section = req.query.section;
//   if (!section) return res.status(400).json({ error: 'Missing section parameter' });

//   try {
//     const messages = await Message.find({ section }).sort({ timestamp: 1 });
//     res.status(200).json(messages);
//   } catch (err) {
//     res.status(500).json({ error: 'Failed to retrieve messages' });
//   }
// };

// export const deleteMessage = async (req, res) => {
//   const { messageId } = req.params;
//   const { sender } = req.body; // get information from request body

//   try {
//     // search for the message
//     const message = await Message.findById(messageId);
    
//     if (!message) {
//       return res.status(404).json({ error: 'Message not found' });
//     }

//     // check if the sender matches
//     if (message.sender !== sender) {
//       return res.status(403).json({ error: 'You can only delete your own messages' });
//     }

//     // check if the message is older than 1 minute
//     const messageTime = new Date(message.timestamp);
//     const currentTime = new Date();
//     const timeDifference = currentTime - messageTime;
//     const oneMinute = 1 * 60 * 1000; // 1 minute in milliseconds

//     if (timeDifference > oneMinute) {
//       return res.status(403).json({ error: 'Message can only be deleted within 1 minute of sending' });
//     }

//     // delete the message
//     await Message.findByIdAndDelete(messageId);
    
//     res.status(200).json({ message: 'Message deleted successfully' });
//   } catch (err) {
//     console.error('Message delete error:', err);
//     res.status(500).json({ error: 'Failed to delete message' });
//   }
// };

// export const editMessage = async (req, res) => {
//   const { messageId } = req.params;
//   const { sender, message: newMessage } = req.body;

//   if (!newMessage || !sender) {
//     return res.status(400).json({ error: 'Missing required fields' });
//   }

//   try {
//     // search for the message
//     const message = await Message.findById(messageId);
    
//     if (!message) {
//       return res.status(404).json({ error: 'Message not found' });
//     }

//     // check if the sender matches
//     if (message.sender !== sender) {
//       return res.status(403).json({ error: 'You can only edit your own messages' });
//     }

//     // check if the message is older than 1 minute
//     const messageTime = new Date(message.timestamp);
//     const currentTime = new Date();
//     const timeDifference = currentTime - messageTime;
//     const oneMinute = 1 * 60 * 1000; // 1 minute in milliseconds

//     if (timeDifference > oneMinute) {
//       return res.status(403).json({ error: 'Message can only be edited within 1 minute of sending' });
//     }

//     // update the message
//     const updatedMessage = await Message.findByIdAndUpdate(
//       messageId,
//       { message: newMessage },
//       { new: true }
//     );
    
//     res.status(200).json(updatedMessage);
//   } catch (err) {
//     console.error('Message edit error:', err);
//     res.status(500).json({ error: 'Failed to edit message' });
//   }
// };

// export default {
//   createMessage,
//   getMessagesBySection,
//   deleteMessage,
//   editMessage
// };


import Message from '../models/message.model.js';
import User from '../models/user.model.js';

export const createMessage = async (req, res) => {
  const { section, message, sender } = req.body;
  
  if (!section || !message || !sender) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  try {
    // let sender = 'Guest';
    // if (req.auth && req.auth.name) {
    //   sender = req.auth.name;
    // }

    console.log('Creating message with sender:', sender, 'Auth info:', req.auth);

    const newMessage = new Message({
      section,
      message,
      sender
    });

    const savedMessage = await newMessage.save();
    res.status(200).json(savedMessage);
  } catch (err) {
    console.error('Message save error:', err);
    res.status(500).json({ error: 'Failed to save message' });
  }
};

export const getMessagesBySection = async (req, res) => {
  const section = req.query.section;
  if (!section) return res.status(400).json({ error: 'Missing section parameter' });

  try {
    const messages = await Message.find({ section }).sort({ timestamp: 1 });
    res.status(200).json(messages);
  } catch (err) {
    res.status(500).json({ error: 'Failed to retrieve messages' });
  }
};

export const deleteMessage = async (req, res) => {
  const { messageId } = req.params;
  const { sender } = req.body; // get information from request body

  try {
    // search for the message
    const message = await Message.findById(messageId);
    
    if (!message) {
      return res.status(404).json({ error: 'Message not found' });
    }

    // Get the user making the request to check their role
    let isAdmin = false;
    try {
      const requestingUser = await User.findOne({ name: sender });
      isAdmin = requestingUser && requestingUser.role === 'admin';
    } catch (userErr) {
      // User lookup failed, treat as non-admin
      console.warn('User lookup failed for sender:', sender, userErr.message);
    }

    // Admin can delete any message, regular users can only delete their own messages
    if (!isAdmin && message.sender !== sender) {
      return res.status(403).json({ error: 'You can only delete your own messages' });
    }

    // Check time limit only for non-admin users
    if (!isAdmin) {
      const messageTime = new Date(message.timestamp);
      const currentTime = new Date();
      const timeDifference = currentTime - messageTime;
      const oneMinute = 1 * 60 * 1000; // 1 minute in milliseconds

      if (timeDifference > oneMinute) {
        return res.status(403).json({ error: 'Message can only be deleted within 1 minute of sending' });
      }
    }

    // delete the message
    await Message.findByIdAndDelete(messageId);
    
    res.status(200).json({ message: 'Message deleted successfully' });
  } catch (err) {
    console.error('Message delete error:', err.message, err.stack);
    res.status(500).json({ error: 'Failed to delete message', details: err.message });
  }
};

export const editMessage = async (req, res) => {
  const { messageId } = req.params;
  const { sender, message: newMessage } = req.body;

  if (!newMessage || !sender) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  try {
    // search for the message
    const message = await Message.findById(messageId);
    
    if (!message) {
      return res.status(404).json({ error: 'Message not found' });
    }

    // Get the user making the request to check their role
    let isAdmin = false;
    try {
      const requestingUser = await User.findOne({ name: sender });
      isAdmin = requestingUser && requestingUser.role === 'admin';
    } catch (userErr) {
      // User lookup failed, treat as non-admin
      console.warn('User lookup failed for sender:', sender, userErr.message);
    }

    // Admin can edit any message, regular users can only edit their own messages
    if (!isAdmin && message.sender !== sender) {
      return res.status(403).json({ error: 'You can only edit your own messages' });
    }

    // Check time limit only for non-admin users
    if (!isAdmin) {
      const messageTime = new Date(message.timestamp);
      const currentTime = new Date();
      const timeDifference = currentTime - messageTime;
      const oneMinute = 1 * 60 * 1000; // 1 minute in milliseconds

      if (timeDifference > oneMinute) {
        return res.status(403).json({ error: 'Message can only be edited within 1 minute of sending' });
      }
    }

    // update the message
    const updatedMessage = await Message.findByIdAndUpdate(
      messageId,
      { message: newMessage },
      { new: true }
    );
    
    if (!updatedMessage) {
      return res.status(404).json({ error: 'Message not found' });
    }
    
    res.status(200).json(updatedMessage);
  } catch (err) {
    console.error('Message edit error:', err.message, err.stack);
    res.status(500).json({ error: 'Failed to edit message', details: err.message });
  }
};

export default {
  createMessage,
  getMessagesBySection,
  deleteMessage,
  editMessage
};