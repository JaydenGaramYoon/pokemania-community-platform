


import Profile from '../models/profile.model.js';
import errorHandler from './error.controller.js';

const createProfile = async (req, res) => {
    const profile = new Profile(req.body);
    try {
        await profile.save();
        res.status(201).json(profile);
    } catch (err) {
        return res.status(400).json({
            error: errorHandler.getErrorMessage(err)
        })
    }
} // OK 
const getProfiles = async (req, res) => {
    try {
        const profiles = await Profile.find();
        res.status(200).json(profiles);
    } catch (err) {
        return res.status(400).json({
            error: errorHandler.getErrorMessage(err)
        });
    }
}; //OK

const getProfileById = async (req, res) => {
    try {
        const { userId } = req.params;
        // userId를 ObjectId로 변환 (mongoose가 자동 변환해주지만 명시적으로 해도 됨)
        const profile = await Profile.findOne({ userId : userId });
        if (!profile) {
            return res.status(404).json({
                error: 'Profile not found'
            });
        }
        res.status(200).json(profile);
    } catch (err) {
        return res.status(400).json({
            error: errorHandler.getErrorMessage(err)
        });
    }
}; //OK

const updateProfile = async (req, res) => {
    try {
        const { userId } = req.params;
        // userId 필드로 찾아서 업데이트
        const profile = await Profile.findOneAndUpdate(
            { userId }, // 조건: userId가 일치하는 프로필
            req.body,
            { new: true }
        );
        if (!profile) {
            return res.status(404).json({
                error: 'Profile not found'
            });
        }
        res.status(200).json(profile);
    } catch (err) {
        return res.status(400).json({
            error: errorHandler.getErrorMessage(err)
        });
    }
};

const deleteProfile = async (req, res) => {
    try {
        const { userId } = req.params;
        const profile = await Profile.findOneAndDelete({ userId });
        if (!profile) {
            return res.status(404).json({
                error: 'Profile not found'
            });
        }
        res.status(204).send();
    } catch (err) {
        return res.status(400).json({
            error: errorHandler.getErrorMessage(err)
        });
    }
} //ok

export default {
    createProfile,
    getProfiles,
    getProfileById,
    updateProfile,
    deleteProfile
};