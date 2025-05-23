import { ProfileType } from "@prisma/client";
import type { z } from "zod";
import { prisma } from "../database";
import { profileCreateSchema } from "../schemas/profileSchema";

export const createProfile = async (
  data: z.infer<typeof profileCreateSchema>
) => {
  const { type, cnpj, cpf, name, mobile, phone, email, address } = data;

  if (!Object.values(ProfileType).includes(type)) {
    throw { status: 400, message: "Tipo de perfil inválido!" };
  }

  if (!address) {
    throw { status: 400, message: "Endereço é obrigatório!" };
  }

  return prisma.profile.create({
    data: {
      type,
      cnpj,
      cpf,
      name,
      mobile,
      phone,
      email,
      address: {
        create: address,
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
  const { type } = data;
  if (type && !Object.values(ProfileType).includes(type)) {
    throw { status: 400, message: "Tipo de perfil inválido!" };
  }
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
