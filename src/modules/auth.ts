import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

export const comparePassword = async (password, hash) => {
  return await bcrypt.compare(password, hash);
}

export const hashPassword = async (password) => {
  // const salt=uuid();
  const genSalt = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, genSalt);
}

export const createJWT = async (user) => {
  const token = await jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET);
  return token;
}

export const protect = (req, res, next) => {
  const bearer = req.headers.authorization;
  if (!bearer) {
    res.sendStatus(401);
    return;
  }
  const token = bearer.split(" ")[1];
  // console.log(token);
  if (!token) {
    res.sendStatus(401);
    return;
  }
  try {
    const user = jwt.verify(token, process.env.JWT_SECRET);
    if (!user) {
      res.sendStatus(401)
      return;
    }
    req.user = user;
    next();
  } catch (err) {
    console.error(err);
    res.sendStatus(403);
    return;
  }
}
