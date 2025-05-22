import express from "express";
import profileRoutes from "./routes/profileRoutes";

const app = express();

app.use(express.json());

const port = process.env.PORT || 4568;

app.get("/ping", (req, res) => {
  return res.send("pong");
});

app.use("/perfis", profileRoutes);

app.listen(port, () => {
  console.log(`Escutando na porta ${port}`);
});
