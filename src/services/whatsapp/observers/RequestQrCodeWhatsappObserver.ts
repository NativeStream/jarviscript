import {
  RequestQrCodeWhatsappEvent,
  NewQrCodeWhatsappEvent,
} from "./../types/index";
import { AppSubject } from "./../../../AppSubject";
import { WhatsappService } from "./../WhatsappService";
import { AbstractObserver, Observer } from "../../../resources/Observer";

@Observer()
export class RequestQrCodeWhatsappObserver extends AbstractObserver<WhatsappService> {
  event = RequestQrCodeWhatsappEvent;
  async callback(event: RequestQrCodeWhatsappEvent): Promise<any> {
    const qrCodeB64 = this.service.qrCode;
    if (qrCodeB64) {
      AppSubject.getInstance().notify(
        new NewQrCodeWhatsappEvent({ qrCodeB64 }).oldEvent(event)
      );
    }
  }
}
