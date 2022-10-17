import type {NextFunction, Request, Response} from 'express';
import express from 'express';
import GroupCollection from './collection';
import UserCollection from '../user/collection';
import { User } from 'user/model';
import * as userValidator from '../user/middleware';
import * as util from './util';
import { Types } from 'mongoose';

const router = express.Router();

/**
 * Get all the groups
 *
 * @name GET /api/groups
 *
 * @return {GroupResponse[]} - A list of all the freets sorted in descending
 *                      order by date modified
 */
/**
 * Get group by id.
 *
 * @name GET /api/groups?name=name
 *
 * @return {GroupResponse[]} - An array of groups with name
 * @throws {400} - If name is not given
 * @throws {404} - If no group has given name
 *
 */
router.get(
  '/',
  async (req: Request, res: Response, next: NextFunction) => {
    // Check if id query parameter was supplied
    if (req.query.name !== undefined) {
      next();
      return;
    }

    const allGroups = await GroupCollection.findAll();
    const response = allGroups.map(util.constructGroupResponse);
    res.status(200).json(response);
  },
  async (req: Request, res: Response) => {
    const groups = await GroupCollection.findOneByName(req.query.name as string);
    const response = groups.map(util.constructGroupResponse);
    res.status(200).json(response);
  }
);

/**
 * Create a new group.
 *
 * @name POST /api/groups
 *
 * @param {string} name - The name of the group
 * @return {GroupResponse} - The created group
 */
router.post(
  '/',
  [
    userValidator.isUserLoggedIn,
  ],
  async (req: Request, res: Response) => {
    const userId = (req.session.userId as string) ?? ''; // Will not be an empty string since its validated in isUserLoggedIn
    const members = new Types.Array<User>(await UserCollection.findOneByUserId(userId));
    const group = await GroupCollection.addOne(req.body.name, members);

    res.status(201).json({
      message: 'Your group was created successfully.',
      group: util.constructGroupResponse(group)
    });
  }
);

/**
 * Delete a group
 *
 * @name DELETE /api/groups/:id
 *
 * @return {string} - A success message
 * @throws {403} - If the user is not logged in
 * @throws {404} - If the groupId is not valid
 */
router.delete(
  '/:groupId?',
  [
    userValidator.isUserLoggedIn
  ],
  async (req: Request, res: Response) => {
    await GroupCollection.deleteOne(req.params.groupId);
    res.status(200).json({
      message: 'Your group was deleted successfully.'
    });
  }
);

export {router as groupRouter};
