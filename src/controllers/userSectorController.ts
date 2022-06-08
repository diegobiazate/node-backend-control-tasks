import { Request, Response } from 'express';
import { UserSector } from '../models/UserSector';

export const addUserSector = async (req: Request, res: Response) => {
  let { id_user, id_sector } = req.body;
  if (id_sector && id_user) {
    let hasUserSector = await UserSector.findOne({ where: { id_sector, id_user } });
    if (!hasUserSector) {
      // conferindo se foi enviado mais de um setor
      if (id_sector.length > 1) {
        // caso tenha sido enviado mais de 1 setor, será feito um for para adicionar todos os setores
        for (let i in id_sector) {
          await UserSector.create({ id_user, id_sector: id_sector[i] });
        }
      } else {
        await UserSector.create({ id_sector, id_user });
      }

      res.status(201);
      res.json({ sucess: true, message: 'Usuário adicionado ao setor' });
    } else {
      res.json({ sucess: false, message: 'Usuário já pertence ao setor' });
    }
  } else {
    res.json({ message: 'Dados não enviados' });
  }
}