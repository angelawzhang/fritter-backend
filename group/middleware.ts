import type {Request, Response, NextFunction} from 'express';
import {Types} from 'mongoose';
import GroupCollection from './collection';

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

export {
    isValidName
}