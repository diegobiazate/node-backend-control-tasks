import { Request, Response } from 'express';
import { User } from '../models/User';
import { generateToken } from '../config/passport';

export const register = async (req: Request, res: Response) => {

  res.json({ error: 'E-mail e/ou senha não enviados.' });
}

export const login = async (req: Request, res: Response) => {

  res.json({ status: false });
}

export const list = async (req: Request, res: Response) => {

  res.json({ list });
}