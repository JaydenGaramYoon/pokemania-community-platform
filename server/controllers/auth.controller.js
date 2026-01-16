// import User from '../models/user.model.js'
// import jwt from 'jsonwebtoken'
// import { expressjwt } from "express-jwt";
// import config from './../config/config.js'
// const signin = async (req, res) => {
//     try {
//         let user = await User.findOne({ "email": req.body.email })
//         if (!user)
//             return res.status(401).json({ error: "User not found" })
//         if (!user.authenticate(req.body.password)) {
//             return res.status(401).send({ error: "Email and password don't match." })
//         }
//         const token = jwt.sign({ 
//             _id: user._id,
//             name: user.name,
//             email: user.email
//         }, config.jwtSecret)
//         res.cookie('t', token, { expire: new Date() + 9999 })
//         return res.json({
//             token,
//             user: {
//                 _id: user._id,
//                 name: user.name,
//                 email: user.email
//             }
//         })
//     } catch (err) {
//         return res.status(401).json({ error: "Could not sign in" })
//     }
// }
// const signout = (req, res) => {
//     res.clearCookie("t")
//     return res.status(200).json({
//         message: "signed out"
//     })
// }
// const requireSignin = expressjwt({
//     secret: config.jwtSecret,
//     algorithms: ["HS256"],
//     userProperty: 'auth',
//     getToken: function fromHeaderOrCookie(req) {
//         if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
//             return req.headers.authorization.split(' ')[1];
//         }
//         else if (req.cookies && req.cookies.t) {
//             return req.cookies.t;
//         }
//         return null;
//     }
// })
// const hasAuthorization = (req, res, next) => {
//     const authorized = req.profile && req.auth
//         && req.profile._id == req.auth._id
//     if (!(authorized)) {
//         return res.status(403).json({
//             error: "User is not authorized"
//         })
//     }
//     next()
// }
// export default { signin, signout, requireSignin, hasAuthorization }

import User from '../models/user.model.js'
import jwt from 'jsonwebtoken'
import { expressjwt } from "express-jwt";
import config from './../config/config.js'
const signin = async (req, res) => {
    try {
        let user = await User.findOne({ "email": req.body.email })
        if (!user)
            return res.status(401).json({ error: "User not found" })
        if (!user.authenticate(req.body.password)) {
            return res.status(401).send({ error: "Email and password don't match." })
        }
        const token = jwt.sign({ 
            _id: user._id,
            name: user.name,
            email: user.email,
            role: user.role || 'user'
        }, config.jwtSecret)
        res.cookie('t', token, { expire: new Date() + 9999 })
        return res.json({
            token,
            user: {
                _id: user._id,
                name: user.name,
                email: user.email,
                role: user.role || 'user'
            }
        })
    } catch (err) {
        return res.status(401).json({ error: "Could not sign in" })
    }
}
const signout = (req, res) => {
    res.clearCookie("t")
    return res.status(200).json({
        message: "signed out"
    })
}
const requireSignin = expressjwt({
    secret: config.jwtSecret,
    algorithms: ["HS256"],
    userProperty: 'auth',
    getToken: function fromHeaderOrCookie(req) {
        if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
            return req.headers.authorization.split(' ')[1];
        }
        else if (req.cookies && req.cookies.t) {
            return req.cookies.t;
        }
        return null;
    }
})
const hasAuthorization = (req, res, next) => {
    console.log('hasAuthorization check:', {
        hasProfile: !!req.profile,
        hasAuth: !!req.auth,
        profileId: req.profile?._id?.toString(),
        authId: req.auth?._id?.toString(),
        authRole: req.auth?.role,
        idMatch: req.profile?._id?.toString() === req.auth?._id?.toString()
    });
    const authorized = req.profile && req.auth
        && (req.profile._id == req.auth._id || req.auth.role === 'admin')
    if (!(authorized)) {
        return res.status(403).json({
            error: "User is not authorized"
        })
    }
    next()
}

const isAdmin = (req, res, next) => {
    console.log('isAdmin check:', { hasAuth: !!req.auth, authRole: req.auth?.role });
    if (req.auth && req.auth.role === 'admin') {
        return next();
    }
    return res.status(403).json({ error: 'Admin resource! Access denied.' });
};

export default { signin, signout, requireSignin, hasAuthorization, isAdmin }

