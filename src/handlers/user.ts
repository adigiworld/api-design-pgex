import prisma from "../db";
import { comparePassword, createJWT, hashPassword } from "../modules/auth";

export const signup = async (req, res) => {
  const user = await prisma.user.create({
    data: {
      email: req.body.email,
      password: await hashPassword(req.body.password)
    }
  });
  const token = await createJWT(user);
  res.status(200).json({ token });
}
export const login = async (req, res) => {
  const user = await prisma.user.findUnique({
    where: { email: req.body.email }
  });
  if (!user) {
    res.sendStatus(401);
    return;
  }
  const isValid = await comparePassword(req.body.password, user.password);
  if (!isValid) {
    res.sendStatus(403);
    return;
  }
  const token = await createJWT(user);
  res.status(200).json({ token });
}
