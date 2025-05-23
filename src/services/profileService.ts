import { ProfileDTO } from "dto/profile.dto";
import type { z } from "zod";
import { prisma } from "../database";
import {
  profileCreateSchema,
  type profileUpdateSchema,
} from "../schemas/profileSchema";

export const createProfile = async (
  data: z.infer<typeof profileCreateSchema>
) => {
  const profile = await prisma.profile.create({
    data: {
      ...data,
      address: {
        create: data.address,
      },
    },
    include: { address: true },
  });

  return new ProfileDTO(profile);
};

export const listProfiles = async () => {
  const profiles = await prisma.profile.findMany({
    include: { address: true },
  });

  return profiles.map((profile) => new ProfileDTO(profile));
};

export const getProfileById = async (id: string) => {
  const profile = await prisma.profile.findUnique({
    where: { id },
    include: { address: true },
  });

  if (!profile) throw { status: 404, message: "Perfil não encontrado!" };

  return new ProfileDTO(profile);
};

export const updateProfile = async (
  id: string,
  data: z.infer<typeof profileUpdateSchema>
) => {
  let addressUpdate = undefined;
  if (data.address) {
    const { profileId, ...addressFields } = data.address;
    addressUpdate = { update: addressFields };
  }

  const { id: profileId, address, ...profileFields } = data;

  const profile = await prisma.profile.update({
    where: { id },
    data: {
      ...profileFields,
      address: addressUpdate,
    },
    include: { address: true },
  });

  return new ProfileDTO(profile);
};

export const deleteProfile = async (id: string) => {
  await prisma.profile.delete({ where: { id } });
};
