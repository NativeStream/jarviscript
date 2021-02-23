import { WhatsappeventListeners } from "./src/WhatsappEventListeners";
import { AppSubject } from "./../../AppSubject";
import { Client, ConfigObject, create } from "@open-wa/wa-automate";
import { LoggerColors } from "../../logs/LoggerColors";
import { AbstractService, Service } from "../../resources/Service";
import * as ioClient from "socket.io-client";
import observers from "./observers";
import { NewQrCodeWhatsapp } from "./types";
import { EventBus } from "../../resources/EventBus";
import path from "path";

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
    popup: parseInt(process.env?.WA_POPUP || "8082"),
    qrTimeout: 0,
    sessionDataPath: path.join(__dirname, "src/session/session.data.json"),
    stickerServerEndpoint: false
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

  private emitQRCode(image: string) {
    AppSubject.getInstance().notify<typeof NewQrCodeWhatsapp.type>(
      new EventBus(NewQrCodeWhatsapp, { qrCode: image })
    );
  }

  private listenEventsWA() {
    const socket = ioClient.connect("http://localhost:8082", {
      reconnection: true,
    });
    
    socket.on("message", (message: any) => {
      if (message.namespace == "qr") {
        this.emitQRCode(message.data);
        this.qrCode = message.data;
      }
      if (message.namespace == "STARTUP" && message.data == "SUCESS") {
        socket.close();
        this.qrCode = undefined;
      }
    });
  }
}
