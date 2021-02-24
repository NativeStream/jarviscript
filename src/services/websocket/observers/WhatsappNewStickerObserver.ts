import { AbstractObserver, Observer } from "../../../resources/Observer";
import { WhatsappNewStickerEvent } from "../../whatsapp/types";
import { WebsocketService } from "../WebsocketService";

@Observer()
export default class WhatsappNewStickerObserver extends AbstractObserver<WebsocketService> {
  event = WhatsappNewStickerEvent;
  async callback(event: WhatsappNewStickerEvent): Promise<any> {
    this.service.io.sockets.emit("WhatsappNewStickerEvent", event.data);
  }
}
