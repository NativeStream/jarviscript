import { IEvent } from "../../../interfaces/IEvent";

export const NewQrCodeWhatsapp: IEvent = {
  event: "NEW_QR_CODE_WHATSAPP_EVENT",
  type: {} as {
    qrCode: String;
  }
}

export const RequestQrCodeWhatsapp: IEvent = {
  event: "REQUEST_WHATSAPP_EVENT",
  type: {}
}
