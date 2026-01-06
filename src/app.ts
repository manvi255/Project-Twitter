// src/app.ts
import express from "express";
import { verifyToken } from "./crypto/jwt";

export const app = express();

app.use(express.json());

app.get("/me", (req, res) => {
  const auth = req.headers.authorization;
  if (!auth) return res.sendStatus(401);

  const token = auth.split(" ")[1];
  const payload = verifyToken(token);

  res.json({ userId: payload.userId });
});
