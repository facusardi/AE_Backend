

import dotenv from "dotenv";
dotenv.config();
console.log("SUPABASE_URL:", process.env.SUPABASE_URL);
console.log("SUPABASE_SERVICE_ROLE_KEY:", process.env.SUPABASE_SERVICE_ROLE_KEY ? "OK" : "NO");

import express from "express";
import cors from "cors";
import { createClient } from "@supabase/supabase-js";

const app = express();
app.use(cors());
app.use(express.json());

// Conexión a Supabase
const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

// Ruta de prueba
app.get("/", (req, res) => {
  res.json({ message: "Backend con Supabase funcionando 🚀" });
});
app.get("/Aviso_Empleos", async (req, res) => {
  const { data, error } = await supabase.from("Aviso_Empleos").select("*");

  if (error) return res.status(500).json({ error: error.message });
  res.json(data);
});

// Levantar servidor
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});