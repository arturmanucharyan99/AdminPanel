// import { ObjectId } from "mongodb";
import Users from "../model/users.js";
import mongoose from "mongoose";
import { validationResult } from 'express-validator'

class UsersController {

    async getAllUsers(req, res, next) {
        try {
            const users = await Users.find().select('firstName lastName email');;
            return res.status(200).json(users)
        } catch (error) {
            console.log(error);
        }
    }

    async userPost(req, res, next) {
        const { firstName, lastName, userName, email, password } = req.body;
        const errors = validationResult(req);
        console.log(errors);
        if (!errors.isEmpty()) {
            return res.status(422).json(
                {
                    // message: errors.array()[0].msg,
                    msg: errors.array()[0].msg,
                    path: errors.array()[0].path,
                })
        }
        try {
            const user = new Users({
                firstName: firstName,
                lastName: lastName,
                userName: userName,
                email: email,
                password: password,
            });

            await user.save();

            return res.status(201).json("Succses");
        }
        catch (err) {
            console.log(err);
        }
    }


    async editUserGet(req, res, next) {
        const { userId } = req.body;
        try {

            if (!mongoose.Types.ObjectId.isValid(userId)) {
                return res.status(400).json({ error: 'Invalid user ID' });
            }

            const user = await Users.findById(userId);

            if (!user) {
                return res.status(404).json({ error: 'User not found' });
            }

            return res.status(200).json(user);

        } catch (error) {
            console.log(error);
            return res.status(400).json({ error: 'Invalid user ID' });

        }
    }

    async deleteUser(req, res, next) {
        const { userId } = req.params;
        try {
            if (!mongoose.Types.ObjectId.isValid(userId)) {
                return res.status(400).json({ error: 'Invalid user ID' });
            }

            const result = await Users.findByIdAndDelete(userId);
            // console.log(result);

            return res.status(200).json({message:"succses"});

        } catch (error) {
            console.log(error);
        }
    }

    async updateUser(req, res, next) {
        const { id } = req.body;
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(422).json(
                {
                    msg: errors.array()[0].msg,
                    path: errors.array()[0].path,
                })
        }
        try {
            if (!mongoose.Types.ObjectId.isValid(id)) {
                return res.status(400).json({ error: 'Invalid user ID' });
            }
            const updatedUser = await Users.findByIdAndUpdate(id, { $set: req.body });

            if (!updatedUser) {
                return res.status(404).json({ error: 'User not found' });
            }


            return res.status(204).json("succses")
        } catch (error) {
            console.log(error);
        }
    }




}


export default new UsersController();