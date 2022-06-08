import { Request, Response } from "express";
import { Called } from "../models/Called";

export const addCalled = async (req: Request, res: Response) => {
  let { title, description, status } = req.body;
  try {
    if (title && description) {
      if (status === null || !status) {
        status = "Aberto";
      }
      let call = await Called.create({ title, description, status });
      res.status(201);
      res.json({ sucess: true, ID: call.id });
    } else {
      res.json({ message: 'Dados não enviados.' })
    }
  } catch (error) {
    res.json({ error });
  }
}

export const listCalled = async (req: Request, res: Response) => {
  let calleds = await Called.findAll();
  res.json({ calleds });
}

export const findCalled = async (req: Request, res: Response) => {
  let id = req.params.id;
  if (id) {
    let call = await Called.findByPk(id);
    if (call) {
      res.json({ sucess: true, call });
    } else {
      res.json({ sucess: false, message: 'Chamado não encontrado' });
    }
  } else {
    res.json({ message: 'Dados não enviados' });
  }
}

export const updateCalled = async (req: Request, res: Response) => {
  let { id, title, description, status } = req.body;
  try {
    if (id) {
      let call = await Called.findByPk(id);
      if (call) {
        if (title) {
          call.title = title;
        }
        if (description) {
          call.description = description;
        }
        if (status) {
          call.status = status;
        }
        await call.save();
        res.json({ sucess: true, call });
      } else {
        res.json({ sucess: false, message: 'Chamado não encontrado' });
      }
    } else {
      res.json({ message: 'Dados não enviados' });
    }
  } catch (error) {
    res.json({ error });
  }
}

export const delCalled = async (req: Request, res: Response) => {
  res.json({ message: 'Não é possivel deletar chamados' });
}