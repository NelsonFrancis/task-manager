import { Router } from "express";
import { loginUser, registerUser, logoutUser} from '../controller/user.controller.js'
// import {upload} from '../middlewares/multer.middleware.js'
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();

router.route('/register').post(registerUser);

router.route('/login').post(loginUser);

// secured routes
router.route('/logout').get(verifyJWT, logoutUser)

export default router