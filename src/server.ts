import express, { json, urlencoded } from "express";
import { product } from "./routes";
import { protect } from "./modules/auth";
import { login, signup } from "./handlers/user";
import config from "./config";

const app = express();
// const PORT = process.env.PORT || 8080;
const PORT = config.port;

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
app.use((err, req, res, next) => {
  if (err.type === "auth") {
    res.status(401).json({ message: "Unauthorized" });
  } else if (err.type === "input") {
    res.status(400).json({ message: "Invalid input" });
  } else {
    console.log(err);
    res.status(500).json({ message: `Server have an error: ${err.message}` });
  }
});

export { app, PORT };
