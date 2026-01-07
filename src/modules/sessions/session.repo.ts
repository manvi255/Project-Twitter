import { pg } from "../../db/postgres";

export async function createSession(userId: number, token: string) {
  const expiresAt = new Date();
  expiresAt.setMinutes(expiresAt.getMinutes() + 15);

  await pg.query(
    "INSERT INTO sessions (user_id, token, expires_at) VALUES ($1, $2, $3)",
    [userId, token, expiresAt]
  );
}

export async function findSession(token: string) {
  const result = await pg.query(
    "SELECT * FROM sessions WHERE token = $1 AND expires_at > NOW()",
    [token]
  );
  return result.rows[0];
}

export async function deleteSession(token: string) {
  await pg.query("DELETE FROM sessions WHERE token = $1", [token]);
}

