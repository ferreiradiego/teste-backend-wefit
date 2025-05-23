import type { Address, Profile, ProfileType } from "@prisma/client";
import type { addressSchema, profileCreateSchema } from "schemas/profileSchema";
import type { z } from "zod";

type AddressDTOType = Omit<z.infer<typeof addressSchema>, "profileId">;
type ProfileDTOType = Omit<z.infer<typeof profileCreateSchema>, "address"> & {
  address?: AddressDTOType | null;
};

export class AddressDTO implements AddressDTOType {
  id: string;
  zipCode: string;
  street: string;
  number: string;
  complement?: string | null;
  city: string;
  district: string;
  state: string;

  constructor(address: Address) {
    this.id = address.id;
    this.zipCode = address.zipCode;
    this.street = address.street;
    this.number = address.number;
    this.complement = address.complement;
    this.city = address.city;
    this.district = address.district;
    this.state = address.state;
  }
}

export class ProfileDTO implements ProfileDTOType {
  id: string;
  type: ProfileType;
  cnpj?: string | null;
  cpf?: string | null;
  name: string;
  mobile?: string | null;
  phone?: string | null;
  email: string;
  address?: AddressDTO | null;

  constructor(profile: Profile & { address?: Address | null }) {
    this.id = profile.id;
    this.type = profile.type;
    this.cnpj = profile.cnpj;
    this.cpf = profile.cpf;
    this.name = profile.name;
    this.mobile = profile.mobile;
    this.phone = profile.phone;
    this.email = profile.email;
    this.address = profile.address ? new AddressDTO(profile.address) : null;
  }
}
