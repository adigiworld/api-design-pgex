import express, { json, urlencoded } from "express";
import { product } from "./routes";
import { protect } from "./modules/auth";
import { login, signup } from "./handlers/user";

const app = express();
const PORT = process.env.PORT || 8080;

app.use(urlencoded({ extended: true }));
app.use(json());

app.use((req, _res, next) => {
  console.info(`${req.method} : ${req.url} - ${new Date().toUTCString()}`);
  next();
});

app.get("/", (_req, res) => {
  res.json({ status: "OK" });
});
app.use("/signup", signup);
app.use("/login", login);
app.use("/api", protect, product);

export { app, PORT };
