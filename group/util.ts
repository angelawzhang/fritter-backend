import type {HydratedDocument, Types} from 'mongoose';
import moment from 'moment';
import type {Group} from './model';
import { User } from 'user/model';

// Update this if you add a property to the Freet type!
type GroupResponse = {
  _id: string;
  name: string;
  members: Types.Array<String>;
};

/**
 * Transform a raw Group object from the database into an object
 * with all the information needed by the frontend
 *
 * @param {HydratedDocument<Group>} group - A group
 * @returns {GroupResponse} - The group object formatted for the frontend
 */
const constructGroupResponse = (group: HydratedDocument<Group>): GroupResponse => {
  const groupCopy: Group = {
    ...group.toObject({
      versionKey: false // Cosmetics; prevents returning of __v property
    })
  };
  return {
    ...groupCopy,
    _id: groupCopy._id.toString(),
    name: groupCopy.name,
    members: groupCopy.members
  };
};

export {
    constructGroupResponse
};
