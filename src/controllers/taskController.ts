import { Request, Response } from 'express';
import { Task } from '../models/Task';

export const addTask = async (req: Request, res: Response) => {
  let { id_user, title, description, priority, status } = req.body;
  if (id_user && title) {
    await Task.create({ id_user, title, description, priority, status });
    res.status(201);
    res.json({ sucess: true });
  } else {
    res.json({ message: 'Dados não enviados.' });
  }
}

export const listAll = async (req: Request, res: Response) => {
  let tasks = await Task.findAll();
  res.json({ tasks });
}

export const listOne = async (req: Request, res: Response) => {
  let id = req.params.id;
  let task = await Task.findByPk(id);
  if (task) {
    res.json({ task });
  } else {
    res.json({ message: 'Task não encontrado.' });
  }
}

export const alterStatus = async (req: Request, res: Response) => {
  let { id, status } = req.body;
  let task = await Task.findByPk(id);
  if (task) {
    try {
      task.status = status;
      await task.save();
      res.json({ sucess: true });
    } catch (error) {
      res.json({ error });
    }
  } else {
    res.json({ message: 'Task não encontrado.' });
  }
}

export const update = async (req: Request, res: Response) => {

}

export const delTask = async (req: Request, res: Response) => {
  let id = req.params.id;
  if (id) {
    let task = await Task.findByPk(id);
    if (task) {
      await task.destroy();
      res.json({ sucess: true, message: 'Tarefa deletada' });
    } else {
      res.json({ sucess: false, message: 'Tarefa não encontrada' });
    }
  } else {
    res.json({ message: 'Dados não enviados' });
  }
}