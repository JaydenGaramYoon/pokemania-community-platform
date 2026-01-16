import User from '../models/user.model.js'
import extend from 'lodash/extend.js'
import errorHandler from './error.controller.js'
import crypto from 'crypto'

const create = async (req, res) => {
    const user = new User(req.body)
    try {
        await user.save()
        return res.status(201).json({
            message: "Successfully signed up!",
            user: {
                _id: user._id,
                name: user.name,
                email: user.email
            }
        })
    } catch (err) {
        return res.status(400).json({
            error: errorHandler.getErrorMessage(err)
        })
    }
}
const list = async (req, res) => {
    try {
        let users = await User.find().select('name email role updated created')
        res.json(users)
    } catch (err) {
        return res.status(400).json({
            error: errorHandler.getErrorMessage(err)
        })
    }
}
const userByID = async (req, res, next, id) => {
    try {
        let user = await User.findById(id)
        if (!user)
            return res.status(400).json({
                error: "User not found"
            })
        req.profile = user
        next()
    } catch (err) {
        return res.status(400).json({
            error: "Could not retrieve user"
        })
    }
}
const read = (req, res) => {
    req.profile.hashed_password = undefined
    req.profile.salt = undefined
    return res.json(req.profile)
}
const update = async (req, res) => {
    try {
        let user = req.profile
        user = extend(user, req.body)
        user.updated = Date.now()
        await user.save()
        user.hashed_password = undefined
        user.salt = undefined
        res.json(user)
    } catch (err) {
        return res.status(400).json({
            error: errorHandler.getErrorMessage(err)
        })
    }
}
const remove = async (req, res) => {
    try {
        if (req.auth._id !== req.profile._id.toString() && req.auth.role !== 'admin') {
            return res.status(403).json({ error: 'User is not authorized' });
        }
        let user = req.profile
        let deletedUser = await user.deleteOne()
        deletedUser.hashed_password = undefined
        deletedUser.salt = undefined
        res.json(deletedUser)
    } catch (err) {
        return res.status(400).json({
            error: errorHandler.getErrorMessage(err)
        })
    }
}

export const changePassword = async (req, res) => {
  const { new_password } = req.body;
  
  // 본인의 비밀번호만 변경 가능 (req.profile는 middleware에서 세팅됨)
  if (!req.profile) {
    return res.status(404).json({ error: 'User not found' });
  }

  if (!new_password || new_password.length < 6) {
    return res.status(400).json({ error: 'Password too short' });
  }
  
  try {
    const user = req.profile;

    // virtual password 활용!
    user.password = new_password; // 이 한 줄로 salt와 hashed_password가 자동 생성됨
    user.updated = Date.now();

    await user.save();

    res.json({ message: 'Password updated' });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};

export const updateRole = async (req, res) => {
  const { userId } = req.params;
  const { role } = req.body;
  
  if (!role || !['user', 'admin'].includes(role)) {
    return res.status(400).json({ error: 'Invalid role. Must be "user" or "admin"' });
  }
  
  try {
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ error: 'User not found' });

    user.role = role;
    user.updated = Date.now();

    await user.save();

    // Return user without sensitive data
    user.hashed_password = undefined;
    user.salt = undefined;
    
    res.json(user);
  } catch (err) {
    console.error('Error updating user role:', err);
    res.status(500).json({ error: 'Server error' });
  }
};
// 관리자 권한 미들웨어
export const isAdmin = (req, res, next) => {
  if (req.auth && req.auth.role === 'admin') {
    return next();
  }
  return res.status(403).json({ error: 'Admin resource! Access denied.' });
};

export default { create, userByID, read, list, remove, update, changePassword, updateRole, isAdmin }