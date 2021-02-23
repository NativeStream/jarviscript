import { NewQrCodeWhatsappEvent } from "./types/index";
import { WhatsappeventListeners } from "./src/WhatsappEventListeners";
import { AppSubject } from "./../../AppSubject";
import { Client, ConfigObject, create } from "@open-wa/wa-automate";
import { LoggerColors } from "../../logs/LoggerColors";
import { AbstractService, Service } from "../../resources/Service";
import * as ioClient from "socket.io-client";
import observers from "./observers";
import env from "../../environment";

@Service({
  serviceName: "Whatsapp",
  loggerColor: LoggerColors.GREEN,
  observers,
})
export class WhatsappService extends AbstractService {
  public wppInstance?: Client;
  private config: ConfigObject = {
    disableSpins: true,
    qrLogSkip: true,
    popup: env.whatsapp.popupPort,
    qrTimeout: 0,
    sessionDataPath: env.whatsapp.sessionPath,
    stickerServerEndpoint: false,
  };
  public qrCode?: string;
  private wppEventListeners?: WhatsappeventListeners;

  public async init(): Promise<any> {
    this.listenEventsWA();
    create(this.config).then((client) => {
      this.wppInstance = client;
      this.wppEventListeners = new WhatsappeventListeners(client, this.logger);
    });
  }

  private emitQRCode(qrCodeB64: string) {
    AppSubject.getInstance().notify(new NewQrCodeWhatsappEvent({ qrCodeB64 }));
  }

  private listenEventsWA() {
    const socket = ioClient.connect(`http://localhost:${this.config.popup}`, {
      reconnection: true,
    });

    socket.on("message", (message: any) => {
      if (message.namespace == "qr") {
        this.emitQRCode(message.data);
        this.qrCode = message.data;
      }
      if (message.namespace == "STARTUP" && message.data == "SUCESS")
        this.qrCode = undefined;
    });
  }
}
