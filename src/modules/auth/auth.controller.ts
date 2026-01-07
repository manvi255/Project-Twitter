import { signup, login } from "./auth.service";
import type { Request, Response } from "express";
import { deleteSession } from "../sessions/session.repo";

export async function signupHandler(req: Request, res: Response) {
    const { email, password } = req.body;
    await signup(email, password);
    res.send("User created");
}
export async function loginHandler(req: Request, res: Response) {
    const { email, password } = req.body;
    const token = await login(email, password);
    res.json({ token });
}


export async function logoutHandler(req: Request, res: Response) 
 {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.sendStatus(401);

  await deleteSession(token);
  res.send("Logged out");
}
