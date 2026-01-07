// src/app.ts
import express from "express";
import type { Request, Response } from "express";
import { verifyToken } from "./crypto/jwt";
import { findSession } from "./modules/sessions/session.repo";

export const app = express();

app.use(express.json());
 

app.get("/",async (req: Request, res: Response) => {
  res.send("Backend is running");
  const auth = req.headers.authorization;
  if (!auth) return res.sendStatus(401);

  const token = auth.split(" ")[1];
  if (!token) return res.sendStatus(401);
  const payload = verifyToken(token);
  const session = await findSession(token);
  if (!session) return res.sendStatus(401);

  


 


  res.json({ userId: payload.userId });
});
