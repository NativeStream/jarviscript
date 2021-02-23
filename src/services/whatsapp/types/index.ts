import { AbstractEvent } from "../../../resources/AbstractEvent";


interface iNewQrCodeWhatsappEvent {
  qrCodeB64: string;
}
export class NewQrCodeWhatsappEvent extends AbstractEvent {
  constructor(public data?: iNewQrCodeWhatsappEvent) {
    super();
  }
}

export class RequestQrCodeWhatsappEvent extends AbstractEvent {
  public data?: any;
}
