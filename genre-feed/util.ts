import type {HydratedDocument, Types} from 'mongoose';
import type {GenreFeed} from './model';
import { User } from '../user/model';

type GenreFeedResponse = {
  _id: string;
  user: User;
  genres: Types.Array<String>;
};

/**
 * Transform a raw GenreFeed object from the database into an object
 * with all the information needed by the frontend
 *
 * @param {HydratedDocument<GenreFeed>} feed
 * @returns {GenreFeedResponse}
 */
const constructGenreFeedResponse = (feed: HydratedDocument<GenreFeed>): GenreFeedResponse => {
  const feedCopy: GenreFeed = {
    ...feed.toObject({
      versionKey: false // Cosmetics; prevents returning of __v property
    })
  };
  return {
    ...feedCopy,
    _id: feedCopy._id.toString(),
    user: feedCopy.user,
    genres: feedCopy.genres
  };
};

export {
    constructGenreFeedResponse
};
