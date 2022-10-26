import { Freet } from '../freet/model';
import {Types} from 'mongoose';
import {Schema, model} from 'mongoose';

// Type definition for Likes on the backend
export type Likes = {
    _id: Types.ObjectId;
    freet: Freet;
    likes: Types.Array<String>; // list of userIds that liked the freet
};

const LikesSchema = new Schema<Likes>({
    freet: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'Freet'
    },
    likes: [String]
  });
  
  const LikesModel = model<Likes>('Likes', LikesSchema);
  export default LikesModel;