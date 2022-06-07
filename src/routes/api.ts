import { Router } from 'express';
import { privateRoute } from '../config/passport';

import * as UserController from '../controllers/userController';
import * as SectorController from '../controllers/sectorController';

const router = Router();
// endpoints referente aos Setores
router.post('/addSector', SectorController.addSector);
router.get('/listSector', SectorController.listSector);
router.post('/findSector', SectorController.findSector);
router.put('/updateSector', SectorController.updateSector);
router.delete('/delSector/:id', SectorController.delSector);

//endpoints referente aos Usuários

//endpoints referente aos Chamados

export default router;