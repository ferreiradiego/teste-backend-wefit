import { ProfileType } from "@prisma/client";
import type { z } from "zod";
import { prisma } from "../database";
import { profileCreateSchema } from "../schemas/profileSchema";

export const createProfile = async (
  data: z.infer<typeof profileCreateSchema>
) => {
  return prisma.profile.create({
    data: {
      ...data,
      address: {
        create: data.address,
      },
    },
    include: { address: true },
  });
};

export const listProfiles = async () => {
  return prisma.profile.findMany({ include: { address: true } });
};

export const getProfileById = async (id: string) => {
  const profile = await prisma.profile.findUnique({
    where: { id },
    include: { address: true },
  });
  if (!profile) throw { status: 404, message: "Perfil não encontrado!" };
  return profile;
};

export const updateProfile = async (id: string, data: any) => {
  return prisma.profile.update({
    where: { id },
    data: {
      ...data,
      address: data.address ? { update: data.address } : undefined,
    },
    include: { address: true },
  });
};

export const deleteProfile = async (id: string) => {
  await prisma.profile.delete({ where: { id } });
};
