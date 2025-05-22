import express from "express";
import { prisma } from "./prisma";
import { ProfileType } from "@prisma/client";

const app = express();
app.use(express.json());

const port = process.env.PORT || 4568;

app.get("/ping", (req, res) => {
  return res.send("pong");
});

app.post("/perfis", async (req, res) => {
  try {
    const { type, cnpj, cpf, name, mobile, phone, email, address } = req.body;

    if (!Object.values(ProfileType).includes(type)) {
      return res.status(400).json({ error: "Tipo de perfil inválido!" });
    }
    if (!address) {
      return res.status(400).json({ error: "Endereço é obrigatório!" });
    }
    const profile = await prisma.profile.create({
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
    res.status(201).json(profile);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Erro ao cadastrar perfil!" });
  }
});

app.get("/perfis", async (req, res) => {
  try {
    const profiles = await prisma.profile.findMany({
      include: { address: true },
    });
    res.status(200).json(profiles);
  } catch (err) {
    res.status(500).json({ error: "Erro ao listar perfis!" });
  }
});

app.get("/perfis/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const profile = await prisma.profile.findUnique({
      where: { id },
      include: { address: true },
    });

    if (!profile)
      return res.status(404).json({ error: "Perfil não encontrado!" });

    res.status(200).json(profile);
  } catch (err) {
    res.status(500).json({ error: "Erro ao buscar perfil!" });
  }
});

app.put("/perfis/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { type, cnpj, cpf, name, mobile, phone, email, address } = req.body;

    if (type && !Object.values(ProfileType).includes(type)) {
      return res.status(400).json({ error: "Tipo de perfil inválido!" });
    }

    const profile = await prisma.profile.update({
      where: { id },
      data: {
        type,
        cnpj,
        cpf,
        name,
        mobile,
        phone,
        email,
        address: address ? { update: address } : undefined,
      },
      include: { address: true },
    });

    res.status(200).json(profile);
  } catch (err) {
    res.status(500).json({ error: "Erro ao atualizar perfil!" });
  }
});

app.delete("/perfis/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await prisma.profile.delete({
      where: { id },
    });
    res.status(204).send();
  } catch (err) {
    res.status(500).json({ error: "Erro ao deletar perfil!" });
  }
});

app.listen(port, () => {
  console.log(`Escutando na porta ${port}`);
});
