import type {HydratedDocument, Types} from 'mongoose';
import UserModel, { User } from '../user/model';
import FreetModel, { Freet } from '../freet/model';
import type {GenreFeed} from './model';
import GenreFeedModel from './model';
import { isCurrentSessionUserExists } from 'user/middleware';

class GenreFeedCollection {
    /**
     * Create a new feed
     * 
     * @param {User} user - The associated user
     * 
     * @return {Promise<HydratedDocument<GenreFeed>>}
     */
    static async addOne(user: User): Promise<HydratedDocument<GenreFeed>> {
        const feed = new GenreFeedModel({
            user: user,
            genres: []
        });
        await feed.save(); // Saves to MongoDB
        return feed;
    }

    /**
     * Get the feed of a user
     * 
     * @param {string} userId - The associated user
     * @param {string} genre - The genre
     *
     * @return {Promise<HydratedDocument<Freet>[]>}
     */
     static async findByUser(userId: Types.ObjectId | string, genre: string): Promise<Array<HydratedDocument<Freet>>> {
        const user = await UserModel.findOne({_id: userId});
        const allFreets = await FreetModel.find({authorId: {$in: [user.following]}});
        console.log(genre);
        if (genre != "") {
            return allFreets.filter(freet => freet.content.includes(genre));
        }
        return allFreets;
    }

    /**
     * Add genre to a feed
     * 
     * @param {string} userId - The associated user
     * @param {string} genre - The name of the genre
     * 
     * @return {Promise<HydratedDocument<GenreFeed>>}
     */
     static async addGenre(userId: Types.ObjectId | string, genre: string): Promise<HydratedDocument<GenreFeed>> {
        const user = await UserModel.findOne({_id: userId});
        const feed = await GenreFeedModel.findOne({user: user});
        feed.genres.push(genre);
        await feed.save();
        return feed;
    }
}

export default GenreFeedCollection;