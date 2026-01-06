//Express app,middleware,routes

import { verifyToken } from "./crypto/jwt";
app.get("/me", (req, res) => {
    const auth = req.headers.authorization;
    if (!auth) return res.sendStatus(401);

    const token = auth.split(" ")[1];
    const payload = verifyToken(token);

    res.json({ userId: payload.userId });
});