import Favourite from '../models/favourites.model.js';
import errorHandler from './error.controller.js';
const createFavourite = async (req, res) => {
    const favourite = new Favourite(req.body);
    try {
        await favourite.save();
        res.status(201).json(favourite);
    } catch (err) {
        return res.status(401).json({
            error: errorHandler.getErrorMessage(err)
        })
    }
} // OK 

const getFavouritesById = async (req, res) => {
    try {
        const { favouriteId } = req.params;
        const favourite = await Favourite.findById(favouriteId);
        if (!favourite) {
            return res.status(404).json({
                error: "Favourite not found"
            });
        }
        res.json(favourite);
    } catch (err) {
        return res.status(400).json({
            error: errorHandler.getErrorMessage(err)
        });
    }
}

const getFavouritesByUser = async (req, res) => {
    try {
        const { userId } = req.params;
        const favourites = await Favourite.find({ user: userId });
        res.json(favourites);
    } catch (err) {
        return res.status(400).json({
            error: errorHandler.getErrorMessage(err)
        });
    }
}; //OK

const listFavourites = async (req, res) => {
    try {
        const favourites = await Favourite.find();
        res.status(200).json(favourites);
    } catch (err) {
        errorHandler(err, res);
    }
} //OK

const removeFavouriteById = async (req, res) => {
    try {
        const { userId, pokemonId } = req.params;
        // pokemonId가 숫자라면 Number로 변환
        const deletedFavourite = await Favourite.findOneAndDelete({
            user: userId,
            pokemonId: Number(pokemonId)
        });
        if (!deletedFavourite) {
            return res.status(404).json({
                error: "Favourite not found"
            });
        }
        res.status(200).json({ message: "Favourite deleted" });
    } catch (err) {
        return res.status(400).json({
            error: errorHandler.getErrorMessage(err)
        });
    }
};

const updateFavourite = async (req, res) => {
    try {
        const { userId, pokemonId } = req.params;
        const { nickname, memo } = req.body;
        
        const updatedFavourite = await Favourite.findOneAndUpdate(
            {
                user: userId,
                pokemonId: Number(pokemonId)
            },
            {
                nickname: nickname || '',
                memo: memo || ''
            },
            { new: true } // 업데이트된 문서를 반환
        );
        
        if (!updatedFavourite) {
            return res.status(404).json({
                error: "Favourite not found"
            });
        }
        
        res.status(200).json(updatedFavourite);
    } catch (err) {
        return res.status(400).json({
            error: errorHandler.getErrorMessage(err)
        });
    }
};

export default {
    createFavourite,
    getFavouritesById,
    getFavouritesByUser,
    listFavourites,
    removeFavouriteById,
    updateFavourite
}