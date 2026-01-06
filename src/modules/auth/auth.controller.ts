import { signup, login } from "./auth.service";
export async function signupHandler(req, res) {
    const { email, password } = req.body;
    await signup(email, password);
    res.send("User created");
}
export async function loginHandler(req, res) {
    const { email, password } = req.body;
    const token = await login(email, password);
    res.json({ token });
}
