import app from "./app";

const env = process.env.NODE_ENV || "prod";
const path = `.env.${env}`;

const dotenv = require("dotenv");
dotenv.config({
  path,
});

app.init();
