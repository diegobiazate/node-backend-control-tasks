import { Router } from 'express';
import { privateRoute } from '../config/passport';

import * as UserController from '../controllers/userController';
import * as SectorController from '../controllers/sectorController';
import * as FunctionUserController from '../controllers/userSectorController';
import * as CalledController from '../controllers/calledController';
import * as CalledUserController from '../controllers/calledUserController';
import * as CalledSectorController from '../controllers/calledSectorController';

const router = Router();
// endpoints referente aos Setores
router.post('/sector/addSector', SectorController.addSector);
router.get('/sector/listSector', SectorController.listSector);
router.post('/sector/findSector', SectorController.findSector);
router.put('/sector/updateSector', SectorController.updateSector);
router.delete('/sector/delSector/:id', SectorController.delSector);

//endpoints referente aos Usuários
router.post('/user/addUser', UserController.addUser);
router.post('/user/login', UserController.login);
router.get('/user/listUser', UserController.listUser);
router.get('/user/findUser/:id', UserController.findUser);
router.put('/user/updateUser', privateRoute, UserController.updateUser);
router.delete('/user/delUser/:id', privateRoute, UserController.delUser);

//endpoints referente ao Usuário_Setor
router.post('/function/addUserSector', FunctionUserController.addUserSector);

//endpoints referente aos Chamados
router.post('/called/addCalled', CalledController.addCalled);
router.get('/called/listCalled', CalledController.listCalled);
router.get('/called/findCalled/:id', CalledController.findCalled);
router.put('/called/updateCalled', CalledController.updateCalled);
router.delete('/called/delCalled/:id', CalledController.delCalled);

//endpoints adicionar Usuário ao chamado
router.post('/calledUser/add', CalledUserController.add);

//endpoints adicinoar Setor ao chamado
router.post('/calledSector/add', CalledSectorController.add);

export default router;