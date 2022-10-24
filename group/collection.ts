import type {HydratedDocument, Types} from 'mongoose';
import UserModel, { User } from '../user/model';
import type {Group} from './model';
import GroupModel from './model';

class GroupCollection {
  /**
   * Add a new group
   *
   * @param {string} name - The name of the group
   * @param {string} userId - The user making the group
   * @return {Promise<HydratedDocument<Group>>} - The newly created group
   */

    static async addOne(name: string, userId: string): Promise<HydratedDocument<Group>> {
        const group = new GroupModel({
            name: name, 
            members: [userId]
        });
        await group.save(); // Saves group to MongoDB
        return group;
    }

    /**
     * Get all the groups in the database
     *
     * @return {Promise<HydratedDocument<Group>[]>} - An array of all of the groups
     */
    static async findAll(): Promise<Array<HydratedDocument<Group>>> {
        // Retrieves groups
        return GroupModel.find({});
    }

    /**
     * Find a group by name.
     *
     * @param {string} name - The name of the group to find
     * @return {Promise<HydratedDocument<Group>> | Promise<null>} - The group with the given name, if any
     */
    static async findByName(name: string): Promise<Array<HydratedDocument<Group>>> {
        return GroupModel.find({name: name});
    }

    /**
     * Add a member to a group.
     *
     * @param {string} groupId - The groupId of the group to find
     * @param {string} username - The user to add
     * @return {Promise<HydratedDocument<Group>> | Promise<null>} - The group with the given name, if any
     */
     static async addUserToGroup(groupId: Types.ObjectId | string, username: string): Promise<HydratedDocument<Group>> {
        const user = await UserModel.findOne({username: new RegExp(`^${username.trim()}$`, 'i')});
        const group = await GroupModel.findOne({_id: groupId});
        group.members.push(user.id as string);
        await group.save();
        return group;
    }

    /**
     * Update group's name
     *
     * @param {string} groupId - The groupId of the group to update
     * @param {string} groupName - The updated name of the group
     * @return {Promise<HydratedDocument<Group>>} - The updated group
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
     * @param {string} groupId - The groupId of group to delete
     * @return {Promise<Boolean>} - true if the group has been deleted, false otherwise
     */
    static async deleteOne(groupId: Types.ObjectId | string): Promise<boolean> {
        const group = await GroupModel.deleteOne({_id: groupId});
        return group !== null;
    }
}

export default GroupCollection;