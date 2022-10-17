import type {HydratedDocument, Types} from 'mongoose';
import { User } from 'user/model';
import type {Group} from './model';
import GroupModel from './model';

class GroupCollection {
  /**
   * Add a new group
   *
   * @param {string} name - The name of the group
   * @param {Types.Array<User>} members - The members of the group
   * @return {Promise<HydratedDocument<Group>>} - The newly created user
   */

    static async addOne(name: string, members: Types.Array<User>): Promise<HydratedDocument<Group>> {
        const group = new GroupModel({name, members});
        await group.save(); // Saves user to MongoDB
        return group;
    }

    /**
     * Get all the groups in the database
     *
     * @return {Promise<HydratedDocument<Group>[]>} - An array of all of the groups
     */
    static async findAll(): Promise<Array<HydratedDocument<Group>>> {
        // Retrieves freets and sorts them from most to least recent
        return GroupModel.find({});
    }

    /**
     * Find a group by name.
     *
     * @param {string} name - The userId of the user to find
     * @return {Promise<HydratedDocument<Group>> | Promise<null>} - The user with the given username, if any
     */
    static async findOneByName(name: string): Promise<Array<HydratedDocument<Group>>> {
        return GroupModel.find({name: name});
    }

    /**
     * Add a member to a group.
     *
     * @param {string} groupId - The userId of the user to find
     * @param {User} user - The user to add
     * @return {Promise<HydratedDocument<Group>> | Promise<null>} - The user with the given username, if any
     */
     static async addUserToGroup(groupId: Types.ObjectId | string, user: User): Promise<HydratedDocument<Group>> {
        const group = await GroupModel.findOne({_id: groupId});
        group.members.push(user);
        await group.save();
        return group;
    }

    /**
     * Update group's name
     *
     * @param {string} groupId - The userId of the user to update
     * @param {string} groupName - An object with the user's updated credentials
     * @return {Promise<HydratedDocument<Group>>} - The updated user
     */
    static async updateOne(groupId: Types.ObjectId | string, groupName: string): Promise<HydratedDocument<Group>> {
        const group = await GroupModel.findOne({_id: groupId});
        group.name = groupName;
        await group.save();
        return group;
    }

    /**
     * Delete a group from the collection.
     *
     * @param {string} groupId - The userId of user to delete
     * @return {Promise<Boolean>} - true if the user has been deleted, false otherwise
     */
    static async deleteOne(groupId: Types.ObjectId | string): Promise<boolean> {
        const group = await GroupModel.deleteOne({_id: groupId});
        return group !== null;
    }
}

export default GroupCollection;