import { Router } from "express";
import { addTasks, getMyTasks, editTask, getTask, deleteTask } from '../controller/task.controller.js'
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();

// secured routes
router.route('/addTask').post(verifyJWT, addTasks)
router.route('/getMyTasks').get(verifyJWT, getMyTasks)
router.route('/getMyTasks/:taskId').get(verifyJWT, getTask)
router.route('/editTask').patch(verifyJWT, editTask)
router.route('/deleteTask').delete(verifyJWT, deleteTask)

export default router 