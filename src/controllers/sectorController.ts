import { Request, Response } from "express";
import { Sector } from "../models/Sector";

//adicionando um novo setor
export const addSector = async (req: Request, res: Response) => {
  // verificando se foi enviado o nome e a descrição do setor
  if (req.body.sector_name && req.body.description) {
    let { sector_name, description } = req.body;
    // checando se o nome do setor já existe
    let hasSector = await Sector.findOne({ where: { sector_name } });
    //caso não exista, entrará no if e adicionará o setor
    if (!hasSector) {
      let newSector = await Sector.create({ sector_name, description });
      res.status(201);
      res.json({ id: newSector.id });
    } else {
      // caso não já exista o nome do setor, retornará esta mensagem
      res.json({ error: 'Setor já existe' });
    }
  } else {
    //caso não tenha sido enviado os valores de nome e descrição para o setor retornará esta mensagem.
    res.json({ error: 'Nome do Setor ou Descrição não enviados.' });
  }
}

// listando todos os setores já cadastrados
export const listSector = async (req: Request, res: Response) => {
  //pegando todos os resultados
  let sectors = await Sector.findAll();
  // retornando os resultados
  res.status(200).json({ sectors });
}

// filtrando setor pelo nome
export const findSector = async (req: Request, res: Response) => {
  //recebendo o valor enviado na requisição
  let sector_name = req.body.sector_name;
  //buscando no banco se existe este sector_name
  let sector = await Sector.findOne({
    where: { sector_name }
  });
  //caso encontre, retornará o mesmo, caso não, retornará uma mensagem informando que não foi encontrado
  if (sector) {
    res.status(200).json({ sector });
  } else {
    res.json({ message: 'Setor não encontrado' });
  }
}

//editando um setor
export const updateSector = async (req: Request, res: Response) => {
  // pegando todas as variáveis
  let { id, sector_name, description } = req.body;

  try {
    //buscando o setor pelo id
    let sector = await Sector.findByPk(id);
    if (sector) {
      //atualizando as informações com as que foram enviadas.
      sector.sector_name = sector_name;
      sector.description = description;
      //salvando no banco as alterações;
      await sector.save();
      //retorno da solicitação
      res.status(200).json({ response: 'sucess' });
    }
  } catch (error) {
    //retornando o erro caso haja
    res.json({ error })
  }
}

//deletando um setor
export const delSector = async (req: Request, res: Response) => {
  // recebendo o id enviado
  let idSector: string = req.params.id;
  // buscando o setor pelo id
  let sector = await Sector.findByPk(idSector);
  if (sector) {
    //caso o encontrado, excluindo o mesmo no banco e retornando mensagem de sucesso
    await sector.destroy();
    res.status(200).json({ response: 'sucess' });
  } else {
    // caso não encontre o setor, retorna a mensagem abaixo
    res.json({ message: 'setor não encontrado' });
  }
}