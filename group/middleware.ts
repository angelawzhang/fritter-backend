import type {Request, Response, NextFunction} from 'express';
import {Types} from 'mongoose';
import GroupCollection from './collection';
import GroupModel from './model';

/**
 * Checks if a name in req.body is valid, that is, it matches the name regex
 */
const isValidName = (req: Request, res: Response, next: NextFunction) => {
const nameRegex = /^\w+$/i;
if (!nameRegex.test(req.body.name)) {
    res.status(400).json({
    error: {
        name: 'Name must be a nonempty alphanumeric string.'
    }
    });
    return;
}

next();
};

/**
 * Checks if groupId in req.params exists
 */
 const isIdValid = async (req: Request, res: Response, next: NextFunction) => {
    const { groupId } = req.params as {groupId: string};
  
    if (!groupId || !Types.ObjectId.isValid(groupId)) {
      res.status(404).json({error: `Incorrect input for Group ID.`});
      return;
    }
  
    const group = await GroupModel.exists({_id: groupId});
  
    if (group) {
      next();
    } else {
      res.status(404).json({error: 'Group ID does not exist'});
    }
    return;
  };

export {
    isValidName,
    isIdValid
}