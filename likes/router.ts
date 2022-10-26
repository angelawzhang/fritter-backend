import type {NextFunction, Request, Response} from 'express';
import express from 'express';
import LikesCollection from './collection';
import UserCollection from '../user/collection';
import { User } from 'user/model';
import * as userValidator from '../user/middleware';
import * as util from './util';
import { Types } from 'mongoose';
import FreetCollection from '../freet/collection';


const router = express.Router();

/**
 * Get all the likes
 *
 * @name GET /api/likes
 *
 * @return {LikesResponse[]} - A list of all the likes
 */
/**
 * Get likes by freet id.
 *
 * @name GET /api/likes?freetId=freetId
 *
 * @return {LikesResponse[]} - An array of likes
 *
 */
router.get(
  '/',
  async (req: Request, res: Response, next: NextFunction) => {
    // Check if id query parameter was supplied
    if (req.query.freetId !== undefined) {
      next();
      return;
    }

    const allLikes = await LikesCollection.findAll();
    const response = allLikes.map(util.constructLikesResponse);
    res.status(200).json(response);
  },
  async (req: Request, res: Response) => {
    const likes = await LikesCollection.findByFreet(req.query.freetId as string);
    const response = likes.map(util.constructLikesResponse);
    res.status(200).json(response);
  }
);

/**
 * Create a new likes model.
 *
 * @name POST /api/likes
 *
 * @param {string} id - The id of the freet
 * @return {LikesResponse} - The created likes model
 * 
 * @throws {403} - if the user is not logged in
 */
 router.post(
    '/',
    [
      userValidator.isUserLoggedIn,
    ],
    async (req: Request, res: Response) => {
      const freet = await FreetCollection.findOne(req.body.id);
      const likes = await LikesCollection.addOne(freet);
  
      res.status(201).json({
        message: 'Your likes model was created successfully.',
        likes: util.constructLikesResponse(likes)
      });
    }
);

/**
 * Add a user's like to a freet.
 * 
 * @name PUT /api/likes/:freetId
 * 
 * @param {string} username - The username of the user
 * @return {LikesResponse} - the updated likes model
 * 
 * @throws {403} - if the user is not logged in
 * 
 */
 router.put(
    '/:freetId?',
    [
      userValidator.isUserLoggedIn,
    ],
    async (req: Request, res: Response) => {
      const likes = await LikesCollection.addUserLike(req.params.freetId, req.body.username);
      res.status(200).json({
        message: 'Like added successfully.',
        likes: util.constructLikesResponse(likes)
      });
    }
);

export {router as likesRouter};