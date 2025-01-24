import express, { json } from "express";
import pkg from "jsonwebtoken";
import cors from "cors";

const { verify, sign } = pkg;
const app = express();

app.use(cors());
app.use(json());

const SECRET_KEY = "mi_clave_secreta";

app.post("/verify", (req, res) => {
  const { token } = req.body;

  try {
    const decoded = verify(token, SECRET_KEY);
    res.json({
      valid: true,
      name: decoded.name,
      profileImage: decoded.profileImage,
    });
  } catch (error) {
    res
      .status(401)
      .json({ valid: false, message: "Token inválido o caducado" });
  }
});

const SECRET_KEY2 = "No es correcto";
app.post("/generate", (req, res) => {
  const token = sign(
    {
      name: "Abdo Mohamad",
      profileImage: "https://i.blogs.es/3194cd/one-piece/1366_2000.jpeg",
    },
    SECRET_KEY,
    { expiresIn: "120s" }
  );

  res.json({ token });
});

app.listen(3000, () =>
  console.log("Servidor corriendo en http://localhost:3000")
);
