import { Router } from "express";
import {
  create,
  getById,
  list,
  remove,
  update,
} from "../controllers/profileController";

const router = Router();

/**
 * @swagger
 * /perfis:
 *   post:
 *     summary: Cria um novo perfil
 *     tags: [Perfis]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               type:
 *                 type: string
 *                 enum: [INDIVIDUAL, COMPANY]
 *               cnpj:
 *                 type: string
 *               cpf:
 *                 type: string
 *               name:
 *                 type: string
 *               mobile:
 *                 type: string
 *               phone:
 *                 type: string
 *               email:
 *                 type: string
 *               address:
 *                 type: object
 *                 properties:
 *                   zipCode:
 *                     type: string
 *                   street:
 *                     type: string
 *                   number:
 *                     type: string
 *                   complement:
 *                     type: string
 *                   city:
 *                     type: string
 *                   district:
 *                     type: string
 *                   state:
 *                     type: string
 *           examples:
 *             individual:
 *               summary: Perfil Individual
 *               value:
 *                 type: INDIVIDUAL
 *                 cpf: "12345678901"
 *                 name: "João da Silva"
 *                 mobile: "11999999999"
 *                 phone: "1133334444"
 *                 email: "joao@email.com"
 *                 address:
 *                   zipCode: "01234567"
 *                   street: "Rua das Flores"
 *                   number: "123"
 *                   complement: "Apto 45"
 *                   city: "São Paulo"
 *                   district: "Centro"
 *                   state: "SP"
 *             company:
 *               summary: Perfil Empresa
 *               value:
 *                 type: COMPANY
 *                 cnpj: "12345678000199"
 *                 cpf: "98765432100"
 *                 name: "Empresa Exemplo"
 *                 mobile: "11888888888"
 *                 phone: "1144445555"
 *                 email: "contato@empresa.com"
 *                 address:
 *                   zipCode: "76543210"
 *                   street: "Avenida Brasil"
 *                   number: "1000"
 *                   complement: "Sala 10"
 *                   city: "Rio de Janeiro"
 *                   district: "Copacabana"
 *                   state: "RJ"
 *     responses:
 *       201:
 *         description: Perfil criado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Perfil'
 *             example:
 *               id: "uuid"
 *               type: "COMPANY"
 *               cnpj: "12345678000199"
 *               cpf: "98765432100"
 *               name: "Empresa Exemplo"
 *               mobile: "11888888888"
 *               phone: "1144445555"
 *               email: "contato@empresa.com"
 *               address:
 *                 id: "uuid"
 *                 zipCode: "76543210"
 *                 street: "Avenida Brasil"
 *                 number: "1000"
 *                 complement: "Sala 10"
 *                 city: "Rio de Janeiro"
 *                 district: "Copacabana"
 *                 state: "RJ"
 *                 profileId: "uuid"
 *       400:
 *         description: Dados inválidos
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *             example:
 *               error: "Tipo de perfil inválido!"
 */
router.post("/", create);

/**
 * @swagger
 * /perfis:
 *   get:
 *     summary: Lista todos os perfis
 *     tags: [Perfis]
 *     responses:
 *       200:
 *         description: Lista de perfis
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Perfil'
 */
router.get("/", list);

/**
 * @swagger
 * /perfis/{id}:
 *   get:
 *     summary: Busca um perfil pelo ID
 *     tags: [Perfis]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID do perfil
 *     responses:
 *       200:
 *         description: Perfil encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Perfil'
 *       404:
 *         description: Perfil não encontrado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *             example:
 *               error: "Perfil não encontrado!"
 */
router.get("/:id", getById);

/**
 * @swagger
 * /perfis/{id}:
 *   put:
 *     summary: Atualiza um perfil pelo ID
 *     tags: [Perfis]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID do perfil
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *     responses:
 *       200:
 *         description: Perfil atualizado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Perfil'
 *       400:
 *         description: Dados inválidos
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *             example:
 *               error: "Tipo de perfil inválido!"
 *       404:
 *         description: Perfil não encontrado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *             example:
 *               error: "Perfil não encontrado!"
 */
router.put("/:id", update);

/**
 * @swagger
 * /perfis/{id}:
 *   delete:
 *     summary: Remove um perfil pelo ID
 *     tags: [Perfis]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID do perfil
 *     responses:
 *       204:
 *         description: Perfil removido
 *       404:
 *         description: Perfil não encontrado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *             example:
 *               error: "Perfil não encontrado!"
 */
router.delete("/:id", remove);

export default router;

/**
 * @swagger
 * components:
 *   schemas:
 *     Profile:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *         type:
 *           type: string
 *           enum: [INDIVIDUAL, COMPANY]
 *         cnpj:
 *           type: string
 *         cpf:
 *           type: string
 *         name:
 *           type: string
 *         mobile:
 *           type: string
 *         phone:
 *           type: string
 *         email:
 *           type: string
 *         address:
 *           $ref: '#/components/schemas/Address'
 *     Address:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *         zipCode:
 *           type: string
 *         street:
 *           type: string
 *         number:
 *           type: string
 *         complement:
 *           type: string
 *         city:
 *           type: string
 *         district:
 *           type: string
 *         state:
 *           type: string
 *         profileId:
 *           type: string
 */
