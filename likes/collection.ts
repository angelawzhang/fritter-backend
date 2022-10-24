import type {HydratedDocument, Types} from 'mongoose';
import UserModel from '../user/model';
import FreetModel, { Freet } from '../freet/model';
import type {Likes} from './model';
import LikesModel from './model';

class LikesCollection {
    /**
     * Create a new Likes data model
     * 
     * @param {Freet} freet - The associated freet
     * 
     * @return {Promise<HydratedDocument<Likes>>} - The newly created likes model
     * 
     */

    static async addOne(freet: Freet): Promise<HydratedDocument<Likes>> {
        const likes = new LikesModel({
            freet: freet,
        });
        await likes.save(); // Saves to MongoDB
        return likes;
    }

    /**
     * Get all the likes in the database
     *
     * @return {Promise<HydratedDocument<Likes>[]>} - An array of all of the likes
     */
     static async findAll(): Promise<Array<HydratedDocument<Likes>>> {
        // Retrieves likes
        return LikesModel.find({});
    }

    /**
     * Get all the likes in the database
     * 
     * @param {string} freetId - The associated freet
     *
     * @return {Promise<HydratedDocument<Likes>[]>} - An array of all of the likes
     */
     static async findByFreet(freetId: Types.ObjectId | string): Promise<Array<HydratedDocument<Likes>>> {
        // Retrieves likes
        const freet = await FreetModel.findOne({_id: freetId});
        return LikesModel.find({freet: freet});
    }

    /**
     * Add user's like to a freet
     * 
     * @param {string} freetId - The associated freet
     * @param {string} username - The user
     * 
     * @return {Promise<HydratedDocument<Likes>>}
     */
    static async addUserLike(freetId: Types.ObjectId | string, username: string): Promise<HydratedDocument<Likes>> {
        const user = await UserModel.findOne({username: new RegExp(`^${username.trim()}$`, 'i')});
        const freet = await FreetModel.findOne({_id: freetId});
        const freetLikes = await LikesModel.findOne({freet: freet});
        freetLikes.likes.push(user.id);
        await freetLikes.save();
        return freetLikes;
    }
}

export default LikesCollection;