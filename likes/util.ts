import type {HydratedDocument, Types} from 'mongoose';
import moment from 'moment';
import type {Likes} from './model';
import { User } from 'user/model';
import { Freet } from 'freet/model';

type LikesResponse = {
  _id: string;
  freet: Freet;
  likes: Types.Array<String>;
};

/**
 * Transform a raw Group object from the database into an object
 * with all the information needed by the frontend
 *
 * @param {HydratedDocument<Likes>} likes
 * @returns {LikesResponse}
 */
const constructLikesResponse = (likes: HydratedDocument<Likes>): LikesResponse => {
  const likesCopy: Likes = {
    ...likes.toObject({
      versionKey: false // Cosmetics; prevents returning of __v property
    })
  };
  return {
    ...likesCopy,
    _id: likesCopy._id.toString(),
    freet: likesCopy.freet,
    likes: likesCopy.likes
  };
};

export {
    constructLikesResponse
};
