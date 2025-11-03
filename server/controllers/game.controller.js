import Game from '../models/game.model.js';
import errorHandler from './error.controller.js';

const create = async (req, res) => {
    try {
        const { user, score } = req.body; 
        const game = new Game({
            user: user, 
            score: score,
            playedAt: new Date()
        });
        await game.save();
        return res.status(201).json({ message: "New record created!", game });
    } catch (err) {
        return res.status(400).json({
            error: errorHandler.getErrorMessage(err)
        });
    }
};

const getScore = async (req, res) => {
    try {
        const { userId } = req.params;
        const games = await Game.find({ user: userId }).sort({ playedAt: -1 });
        res.json(games); 
    } catch (err) {
        return res.status(400).json({
            error: errorHandler.getErrorMessage(err)
        });
    }
};


const updateScore = async (req, res) => {
    try {
        const { score } = req.body;
        const updatedGame = await Game.findByIdAndUpdate(
            req.params.gameId, // 🔁 userId ❌ → gameId ✅
            { score: score, playedAt: new Date() },
            { new: true }
        );
        if (!updatedGame) {
            return res.status(404).json({ error: 'Game record not found' });
        }
        res.json({ message: 'Game record updated', updatedGame });
    } catch (err) {
        res.status(400).json({ error: errorHandler.getErrorMessage(err) });
    }
};

const removeScore = async (req, res) => {
    try {
        const { gameId } = req.params;
        const deletedGame = await Game.findByIdAndDelete(gameId);
        if (!deletedGame) {
            return res.status(404).json({ error: 'Game record not found' });
        }
        res.json({ message: 'Game record deleted', deletedGame });
    } catch (err) {
        return res.status(400).json({
            error: errorHandler.getErrorMessage(err)
        });
    }
};

export default { create, getScore, updateScore, removeScore };
