import SendStatus from "./SendStatus";
import WhatsappSend from "./WhatsappSend";
import PlayerEvents from "./Player";
import SendImageAsSticker from "./SendImageAsSticker";
import SendUrlAsSticker from "./SendUrlAsSticker";

export default [
  SendStatus,
  WhatsappSend,
  SendImageAsSticker,
  SendUrlAsSticker,
  ...PlayerEvents,
];
