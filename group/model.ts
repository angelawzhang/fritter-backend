import {Types, PopulatedDoc, Document} from 'mongoose';
import {Schema, model} from 'mongoose';
import type {User} from '../user/model';

// Type definition for Group on the backend
export type Group = {
    _id: Types.ObjectId;
    name: string;
    members: Types.Array<String>;
};

const GroupSchema = new Schema<Group>({
    name: {
      type: String,
      required: true
    },
    members: [String]
  });
  
  const GroupModel = model<Group>('Group', GroupSchema);
  export default GroupModel;