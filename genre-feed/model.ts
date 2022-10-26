import {Types} from 'mongoose';
import {Schema, model} from 'mongoose';
import { User } from 'user/model';

// Type definition for Likes on the backend
export type GenreFeed = {
    _id: Types.ObjectId;
    user: User;
    genres: Types.Array<String>;
};

const GenreFeedSchema = new Schema<GenreFeed>({
    user: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'User'
    },
    genres: {
      type: [String],
      required: true
    }
  });
  
  const GenreModel = model<GenreFeed>('GenreFeed', GenreFeedSchema);
  export default GenreModel;