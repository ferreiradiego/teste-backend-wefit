import swaggerJSDoc from "swagger-jsdoc";

const port = process.env.PORT || 4568;

const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Desafio Wefit - API de perfis",
      version: "1.0.0",
      description: "Desafio Wefit - API de perfis",
    },
    servers: [
      {
        url: `http://localhost:${port}`,
      },
    ],
  },
  apis: ["./src/routes/*.ts"],
};

export const swaggerDocs = swaggerJSDoc(swaggerOptions);
