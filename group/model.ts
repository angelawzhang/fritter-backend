import type {Types, PopulatedDoc, Document} from 'mongoose';
import {Schema, model} from 'mongoose';
import type {User} from '../user/model';

// Type definition for Group on the backend
export type Group = {
    _id: Types.ObjectId;
    name: string;
    members?: Types.Array<User>;
};

const GroupSchema = new Schema<Group>({
    name: {
      type: String,
      required: true
    }
  });
  
  const GroupModel = model<Group>('Group', GroupSchema);
  export default GroupModel;