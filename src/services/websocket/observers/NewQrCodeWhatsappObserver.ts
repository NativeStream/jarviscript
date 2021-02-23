import { NewQrCodeWhatsappEvent } from './../../whatsapp/types/index';
import { WebsocketService } from "./../WebsocketService";
import { AbstractObserver, Observer } from "../../../resources/Observer";

@Observer()
export default class NewQrCodeWhatsappObserver extends AbstractObserver<WebsocketService> {
  event = NewQrCodeWhatsappEvent;
  async callback(event: NewQrCodeWhatsappEvent): Promise<any> {
    const socket = event.client?.socket;
    // if (socket) socket.emit(this.event.event, eventBus.data);
    // else this.service.io.sockets.emit(this.event.event, eventBus.data);
  }
}
