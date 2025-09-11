import { Router } from "express";
import { addTasks, getMyTasks } from '../controller/task.controller.js'
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();

// secured routes
router.route('/addTasks').post(verifyJWT, addTasks)
router.route('/getMyTasks').get(verifyJWT, getMyTasks)

export default router