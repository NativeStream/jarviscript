import { WebsocketService } from "./../WebsocketService";
import { AbstractObserver, Observer } from "../../../resources/Observer";
import { NewQrCodeWhatsapp } from "../../whatsapp/types";
import { EventBus } from "../../../resources/EventBus";

@Observer()
export default class NewQrCodeWhatsappObserver extends AbstractObserver<WebsocketService> {
  event = NewQrCodeWhatsapp;
  async callback(eventBus: EventBus<typeof NewQrCodeWhatsapp.type>): Promise<any> {
    const socket = eventBus.client.socket;
    if (socket) socket.emit(this.event.event, eventBus.data);
    else this.service.io.sockets.emit(this.event.event, eventBus.data);
  }
}
