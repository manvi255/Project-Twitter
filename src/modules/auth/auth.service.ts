import { hashPassword, verifyPassword } from "../../crypto/password";
import { createToken } from "../../crypto/jwt";
import { createUser, findUserByEmail } from "./user.repo";
import { createSession } from "../sessions/session.repo";

export async function signup(email: string, password: string) {
  const passwordHash = await hashPassword(password);
  await createUser(email, passwordHash);
}
export async function login(email: string, password: string) {
  const user = await findUserByEmail(email);

  if (!user) {
    throw new Error("Invalid credentials");
  }
  const isValid = await verifyPassword(password, user.password_hash);

  if (!isValid) {
    throw new Error("Invalid credentials");
  }
  
  const token = createToken(user.id);
  await createSession(user.id, token);

  return createToken(user.id);
}



