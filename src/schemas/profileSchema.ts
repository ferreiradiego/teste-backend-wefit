import { ProfileType } from "@prisma/client";
import { z } from "zod";

export const addressSchema = z.object({
  zipCode: z
    .string({ required_error: "CEP é obrigatório" })
    .min(8, "CEP deve ter 8 dígitos")
    .max(8, "CEP deve ter 8 dígitos"),
  street: z
    .string({
      required_error: "Logradouro é obrigatório",
    })
    .min(1, "Logradouro é obrigatório"),
  number: z
    .string({
      required_error: "Número é obrigatório",
    })
    .min(1, "Número é obrigatório"),
  complement: z.string().optional(),
  city: z
    .string({
      required_error: "Cidade é obrigatória",
    })
    .min(1, "Cidade é obrigatória"),
  district: z
    .string({
      required_error: "Bairro é obrigatório",
    })
    .min(1, "Bairro é obrigatório"),
  state: z
    .string({
      required_error: "Estado é obrigatório",
    })
    .min(1, "Estado é obrigatório"),
});

export const profileCreateSchema = z.object({
  type: z.nativeEnum(ProfileType, {
    errorMap: () => ({ message: "Tipo de perfil inválido" }),
  }),
  cnpj: z.string().optional().nullable(),
  cpf: z.string().optional().nullable(),
  name: z
    .string({
      required_error: "Nome é obrigatório",
    })
    .min(1, "Nome é obrigatório"),
  mobile: z.string().optional(),
  phone: z.string().optional(),
  email: z
    .string({
      required_error: "E-mail é obrigatório",
    })
    .email("E-mail inválido"),
  address: addressSchema,
});

export const profileUpdateSchema = profileCreateSchema.partial().extend({
  address: addressSchema.partial().optional(),
});
