import { Prisma } from "@prisma/client";
import { ERRORS } from "constants/errors";
import { Request, Response } from "express";
import {
  createProfile,
  deleteProfile,
  getProfileById,
  listProfiles,
  updateProfile,
} from "../services";

export const create = async (req: Request, res: Response) => {
  try {
    const profile = await createProfile(req.body);
    res.status(201).json(profile);
  } catch (err: any) {
    res
      .status(err.status || ERRORS.INTERNAL_ERROR.status)
      .json({ error: err.message || ERRORS.INTERNAL_ERROR.message });
  }
};

export const list = async (_req: Request, res: Response) => {
  try {
    const profiles = await listProfiles();
    res.status(200).json(profiles);
  } catch {
    res
      .status(ERRORS.INTERNAL_ERROR.status)
      .json({ error: ERRORS.INTERNAL_ERROR.message });
  }
};

export const getById = async (req: Request, res: Response) => {
  try {
    const profile = await getProfileById(req.params.id);
    res.status(200).json(profile);
  } catch (err: any) {
    if (
      err instanceof Prisma.PrismaClientKnownRequestError &&
      err.code === "P2025"
    ) {
      return res
        .status(ERRORS.PROFILE_NOT_FOUND.status)
        .json({ error: ERRORS.PROFILE_NOT_FOUND.message });
    }
    if (err.status === ERRORS.PROFILE_NOT_FOUND.status) {
      return res
        .status(ERRORS.PROFILE_NOT_FOUND.status)
        .json({ error: err.message || ERRORS.PROFILE_NOT_FOUND.message });
    }
    res
      .status(ERRORS.INTERNAL_ERROR.status)
      .json({ error: err.message || ERRORS.INTERNAL_ERROR.message });
  }
};

export const update = async (req: Request, res: Response) => {
  try {
    const profile = await updateProfile(req.params.id, req.body);
    res.status(200).json(profile);
  } catch (err: any) {
    if (
      err instanceof Prisma.PrismaClientKnownRequestError &&
      err.code === "P2025"
    ) {
      return res
        .status(ERRORS.PROFILE_NOT_FOUND.status)
        .json({ error: ERRORS.PROFILE_NOT_FOUND.message });
    }
    if (err.status === ERRORS.PROFILE_NOT_FOUND.status) {
      return res
        .status(ERRORS.PROFILE_NOT_FOUND.status)
        .json({ error: err.message || ERRORS.PROFILE_NOT_FOUND.message });
    }
    res
      .status(ERRORS.INTERNAL_ERROR.status)
      .json({ error: err.message || ERRORS.INTERNAL_ERROR.message });
  }
};

export const remove = async (req: Request, res: Response) => {
  try {
    await deleteProfile(req.params.id);
    res.status(204).send();
  } catch (err) {
    if (err instanceof Prisma.PrismaClientKnownRequestError) {
      if (err.code === "P2025") {
        return res
          .status(ERRORS.PROFILE_NOT_FOUND.status)
          .json({ error: ERRORS.PROFILE_NOT_FOUND.message });
      }
    }
    res
      .status(ERRORS.INTERNAL_ERROR.status)
      .json({ error: ERRORS.INTERNAL_ERROR.message });
  }
};
