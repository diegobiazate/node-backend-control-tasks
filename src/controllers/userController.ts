import { Request, Response } from 'express';
import { User } from '../models/User';
import { generateToken } from '../config/passport';
import bcrypt from 'bcryptjs';

export const addUser = async (req: Request, res: Response) => {
  let { name, email, password } = req.body;
  if (name && email && password) {
    let hasUser = await User.findOne({ where: { email } });
    if (!hasUser) {
      //criptografando a senha
      const salt = bcrypt.genSaltSync(10);
      const hash = bcrypt.hashSync(password, salt);
      let newUser = await User.create({ name, email, password: hash });
      const token = generateToken({ id: newUser.id });
      res.status(201);
      res.json({ sucess: true, id: newUser.id, token })
    } else {
      res.json({ sucess: false, message: 'E-mail já existe' });
    }
  } else {
    res.json({ error: 'E-mail e/ou senha não enviados.' });
  }
}

export const login = async (req: Request, res: Response) => {
  let { email, password } = req.body;
  console.log(email, password);
  if (email && password) {
    let user = await User.findOne({ where: { email } });
    if (user) {
      //checando se o hash da senha digitada, confere com o hash salvo;
      let pass = bcrypt.compareSync(password, user.password);
      if (pass) {
        const token = generateToken({ id: user.id });
        res.json({ sucess: true, token });
      } else {
        res.json({ sucess: false, message: 'senha incorreta' });
      }
    } else {
      res.json({ sucess: false });
    }
  } else {
    res.json({ message: 'Dados não enviados' });
  }
}

export const listUser = async (req: Request, res: Response) => {
  let users = await User.findAll();
  let list: string[] = [];
  for (let i in users) {
    list.push(users[i].email);
  }
  res.json({ list });
}

export const findUser = async (req: Request, res: Response) => {
  let id = req.params.id;
  let user = await User.findByPk(id);
  if (user) {
    res.json({ Email: user.email, Nome: user.name });
  } else {
    res.json({ message: 'Usuário não encontrado' });
  }
}

export const updateUser = async (req: Request, res: Response) => {
  let { id, name, email, password } = req.body;
  if (id) {
    let user = await User.findByPk(id);
    if (user) {
      try {
        if (name) {
          user.name = name;
        }
        if (email) {
          user.email = email;
        }
        if (password) {
          const salt = bcrypt.genSaltSync(10);
          const hash = bcrypt.hashSync(password, salt);
          user.password = hash;
        }
        await user.save();
        res.json({ sucess: true, message: 'Dados alterados com sucesso.' });
      } catch (error) {
        res.json({ error });
      }
    } else {
      res.json({ sucess: false, message: 'Usuário não encontrado' });
    }
  } else {
    res.json({ message: 'Dados não enviados' });
  }
}

export const delUser = async (req: Request, res: Response) => {
  let id = req.params.id;
  if (id) {
    let user = await User.findByPk(id);
    if (user) {
      await user.destroy();
      res.json({ sucess: true, message: 'Usuário deletado' });
    } else {
      res.json({ sucess: false, message: 'Usuário não encontrado' });
    }
  } else {
    res.json({ message: 'Dados não enviados' });
  }
}