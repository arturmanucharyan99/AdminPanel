import { body, check } from "express-validator";
import Users from "../model/users.js";

export const userValidator = [
   body('firstName').isString().isLength({ min: 3, max: 25 }).notEmpty().withMessage('Please enter min 3 and max 25 symbols').trim(),
   body('lastName').isString().isLength({ min: 3, max: 25 }).notEmpty().withMessage('Please enter min 3 and max 25 symbols').trim(),
   body('userName').isString().isLength({ min: 3, max: 25 }).notEmpty().trim().custom(async (value, { req }) => {
      const user = await Users.findOne({ userName: value })
      if (user) {
         throw new Error('This User already exist');
      }
      return true;
   }),
   body('email').isEmail().notEmpty().trim().custom(async (value, { req }) => {
      const user = await Users.findOne({ email: value })
      if (user) {
         throw new Error('This email already exist');
      }
      return true;
   }),

   body('password').trim()
];



export const userUpdateValidation = [
   body('firstName').isString().isLength({ min: 3, max: 25 }).notEmpty().withMessage('Please enter min 3 and max 25 symbols').trim(),
   body('lastName').isString().isLength({ min: 3, max: 25 }).notEmpty().withMessage('Please enter min 3 and max 25 symbols').trim(),
   body('userName').isString().isLength({ min: 3, max: 25 }).notEmpty().trim().custom(async (value, { req }) => {
      const {id} = req.body;
      const user = await Users.findOne({ userName: value,_id:{$ne:id} })
      if (user) {
         throw new Error('This User already exist');
      }
      return true;
   }),
   body('email').isEmail().notEmpty().trim().custom(async (value, { req }) => {
      const {id} = req.body;
      const user = await Users.findOne({ email: value,_id:{$ne:id} })
      if (user) {
         throw new Error('This email already exist');
      }
      return true;
   }),

   body('password').trim()
];