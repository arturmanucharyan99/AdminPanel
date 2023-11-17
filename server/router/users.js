import  express  from "express"
import UsersController from "../controller/users.js";
import {userValidator,userUpdateValidation} from "../middleware/userValidation.js";
// import {body} from 'express-validation/check'
const router = express.Router();



router.get('/',UsersController.getAllUsers);



router.post('/add-user',userValidator,UsersController.userPost);

router.post('/edit-user-get',UsersController.editUserGet);

router.patch('/upadate-user',userUpdateValidation,UsersController.updateUser);

router.delete('/delete-user',UsersController.deleteUser);





export default router;