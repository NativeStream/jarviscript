import SendStatus from "./SendStatus";
import WhatsappSend from "./WhatsappSend";
import PlayerEvents from "./Player";
import SendImageAsSticker from "./SendImageAsSticker";
import SendUrlAsSticker from "./SendUrlAsSticker";
import CliEvents from "./cli";
import WhatsappResponse from "./WhatsappResponse";

export default [
  SendStatus,
  WhatsappSend,
  SendImageAsSticker,
  SendUrlAsSticker,
  WhatsappResponse,
  ...PlayerEvents,
  ...CliEvents,
];
