import { Request, Response } from "express";
import { CalledUser } from "../models/CalledUser";

export const add = async (req: Request, res: Response) => {
  let { id_called, id_user } = req.body;
  try {
    if (id_called && id_user) {
      let hasCallUsers = await CalledUser.findOne({ where: { id_called, id_user } });
      if (!hasCallUsers) {
        if (id_user.length > 1) {
          // caso tenha sido enviado mais de 1 setor, será feito um for para adicionar todos os setores
          for (let i in id_user) {
            await CalledUser.create({ id_called, id_user: id_user[i] });
          }
        } else {
          await CalledUser.create({ id_called, id_user });
        }
        res.status(201);
        res.json({ sucess: true });
      } else {
        res.json({ sucess: false, message: 'Usuário já pertencente ao chamado' });
      }
    }
  } catch (error) {
    res.json({ error });
  }
}

export const list = async (req: Request, res: Response) => {

}

export const del = async (req: Request, res: Response) => {

}