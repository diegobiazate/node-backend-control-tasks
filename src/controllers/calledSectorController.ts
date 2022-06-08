import { Request, Response } from "express";
import { CalledSector } from "../models/CalledSector";

export const add = async (req: Request, res: Response) => {
  let { id_called, id_sector } = req.body;
  try {
    if (id_called && id_sector) {
      let hasCallUsers = await CalledSector.findOne({ where: { id_called, id_sector } });
      if (!hasCallUsers) {
        if (id_sector.length > 1) {
          // caso tenha sido enviado mais de 1 setor, será feito um for para adicionar todos os setores
          for (let i in id_sector) {
            await CalledSector.create({ id_called, id_sector: id_sector[i] });
          }
        } else {
          await CalledSector.create({ id_called, id_sector });
        }
        res.status(201);
        res.json({ sucess: true });
      } else {
        res.json({ sucess: false, message: 'setor já pertencente ao chamado' });
      }
    }
  } catch (error) {
    res.json({ error });
  }
}
