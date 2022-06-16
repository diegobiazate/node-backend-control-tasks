import { Router } from 'express';
import { privateRoute } from '../config/passport';

import * as UserController from '../controllers/userController';
import * as TaskController from '../controllers/taskController';


const router = Router();
//endpoints referente aos Usuários
router.post('/user/addUser', UserController.addUser);
router.post('/user/login', UserController.login);
router.get('/user/listUser', UserController.listUser);
router.get('/user/findUser/:id', UserController.findUser);
router.put('/user/updateUser', privateRoute, UserController.updateUser);
router.delete('/user/delUser/:id', privateRoute, UserController.delUser);

router.post('/task/add', TaskController.addTask);
router.get('/task/list', TaskController.listAll);
router.get('/task/list/:id', TaskController.listOne);
router.delete('/task/delete/:id', TaskController.delTask);
router.put('/task/alterStatus', TaskController.alterStatus);

export default router;