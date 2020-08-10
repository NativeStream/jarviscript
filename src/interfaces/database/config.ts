export default {
  host: process.env.DB_HOST || "localhost",
  port: process.env.DB_PORT || "27017",
  user: process.env.DB_USER || "",
  pass: process.env.DB_PASS || "",
  name: process.env.DB_NAME || "jarviscript",
};
