import type {NextFunction, Request, Response} from 'express';
import express from 'express';
import GroupCollection from './collection';
import UserCollection from '../user/collection';
import { User } from 'user/model';
import * as userValidator from '../user/middleware';
import * as groupValidator from './middleware';
import * as util from './util';
import { Types } from 'mongoose';

const router = express.Router();

/**
 * Get all the groups
 *
 * @name GET /api/groups
 *
 * @return {GroupResponse[]} - A list of all the groups
 */
/**
 * Get group by id.
 *
 * @name GET /api/groups?name=name
 *
 * @return {GroupResponse[]} - An array of groups with name
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
    const groups = await GroupCollection.findByName(req.query.name as string);
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
 * 
 * @throws {400} - if name is invalid
 * @throws {403} - if the user is not logged in
 */
router.post(
  '/',
  [
    userValidator.isUserLoggedIn,
    groupValidator.isValidName
  ],
  async (req: Request, res: Response) => {
    const userId = (req.session.userId as string);
    const group = await GroupCollection.addOne(req.body.name, userId);

    res.status(201).json({
      message: 'Your group was created successfully.',
      group: util.constructGroupResponse(group)
    });
  }
);

/**
 * Add a new member to a group.
 * 
 * @name PUT /api/groups/:groupId
 * 
 * @param {string} username - The username of the user
 * @return {GroupResponse} - the updated group
 * 
 * @throws {403} - if the user is not logged in
 * @throws {404} - If the groupId is not valid
 * 
 */
router.put(
    '/:groupId?',
    [
      userValidator.isUserLoggedIn,
      groupValidator.isIdValid
    ],
    async (req: Request, res: Response) => {
      const group = await GroupCollection.addUserToGroup(req.params.groupId, req.body.username);
      res.status(200).json({
        message: 'Your group was updated successfully.',
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
    userValidator.isUserLoggedIn,
    groupValidator.isIdValid
  ],
  async (req: Request, res: Response) => {
    await GroupCollection.deleteOne(req.params.groupId);
    res.status(200).json({
      message: 'Your group was deleted successfully.'
    });
  }
);

export {router as groupRouter};
