import express from "express";
import swaggerUi from "swagger-ui-express";
import profileRoutes from "./routes/profileRoutes";
import { swaggerDocs } from "./swagger";

const app = express();

app.use(express.json());

const port = process.env.PORT || 4568;

app.get("/ping", (req, res) => {
  return res.send("pong");
});

app.use("/perfis", profileRoutes);
app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.listen(port, () => {
  console.log(`Escutando na porta ${port}`);
});
