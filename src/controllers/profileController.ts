import { Request, Response } from "express";
import {
  createProfile,
  listProfiles,
  getProfileById,
  updateProfile,
  deleteProfile,
} from "../services";

export const create = async (req: Request, res: Response) => {
  try {
    const profile = await createProfile(req.body);
    res.status(201).json(profile);
  } catch (err: any) {
    res
      .status(err.status || 500)
      .json({ error: err.message || "Erro ao cadastrar perfil!" });
  }
};

export const list = async (_req: Request, res: Response) => {
  try {
    const profiles = await listProfiles();
    res.status(200).json(profiles);
  } catch {
    res.status(500).json({ error: "Erro ao listar perfis!" });
  }
};

export const getById = async (req: Request, res: Response) => {
  try {
    const profile = await getProfileById(req.params.id);
    res.status(200).json(profile);
  } catch (err: any) {
    res
      .status(err.status || 500)
      .json({ error: err.message || "Erro ao buscar perfil!" });
  }
};

export const update = async (req: Request, res: Response) => {
  try {
    const profile = await updateProfile(req.params.id, req.body);
    res.status(200).json(profile);
  } catch (err: any) {
    res
      .status(err.status || 500)
      .json({ error: err.message || "Erro ao atualizar perfil!" });
  }
};

export const remove = async (req: Request, res: Response) => {
  try {
    await deleteProfile(req.params.id);
    res.status(204).send();
  } catch {
    res.status(500).json({ error: "Erro ao deletar perfil!" });
  }
};
