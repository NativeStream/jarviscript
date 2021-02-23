import path from 'path';
const env = process.env;

export default {
  whatsapp: {
    popupPort: parseInt(env.WA_PORT || "8082"),
    sessionPath: path.join(__dirname, "src/session/session.data.json")
  },
  websocket: {
    port: parseInt(env.WEBSOCKET_PORT || "8081")
  }
};
