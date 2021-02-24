import path from 'path';
const env = process.env;

console.log(path.join(__dirname, "src/session/session.data.json"));

export default {
  whatsapp: {
    popupPort: parseInt(env.WA_PORT || "8082"),
    sessionPath: env.SESSION_PATH || path.join(__dirname, "services/whatsapp/src/session/session.data.json")
  },
  websocket: {
    port: parseInt(env.WEBSOCKET_PORT || "8081")
  }
};
