import * as dotenv from "dotenv";
dotenv.config();
import { app, PORT } from "./server";

app.listen(PORT, () => {
  console.info(`Server is running at : http://127.0.0.1:${PORT}`);
});
