import { EventBus } from './../../../resources/EventBus';
import { AppSubject } from './../../../AppSubject';
import { WhatsappService } from "./../WhatsappService";
import { AbstractObserver, Observer } from "../../../resources/Observer";
import { NewQrCodeWhatsapp, RequestQrCodeWhatsapp } from '../types';

@Observer()
export class RequestQrCodeWhatsappObserver extends AbstractObserver<WhatsappService> {
  event = RequestQrCodeWhatsapp;
  async callback(eventBus: EventBus<typeof RequestQrCodeWhatsapp.type>): Promise<any> {
    const qrCode = this.service.qrCode;
    if (qrCode) {
      eventBus.data = { qrCode };
      eventBus.event = NewQrCodeWhatsapp;
      AppSubject.getInstance().notify(eventBus);
    }
  }
}
