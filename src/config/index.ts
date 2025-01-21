import merge from "lodash.merge";

process.env.NODE_ENV = process.env.NODE_ENV || "development";
const stage = process.env.STAGE || "local";
let envConfig;

if (stage === "production") {
  envConfig = require("./prod").default;
} else if (stage === "testing") {
  envConfig = require("./testing").default;
} else {
  envConfig = require("./local");
}

export default merge({
  stage,
  port: 8888,
  env: process.env.NODE_ENV,
  secret: {
    jwt: process.env.JWT_SECRET,
    dbUrl: process.env.DATABASE_URL
  }
}, envConfig);
