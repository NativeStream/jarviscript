import { WhatsappService } from './../WhatsappService';
import { AbstractCommand } from "../../../resources/AbstractCommand";

export default class sticker extends AbstractCommand {
  public async action(): Promise<void> {
    const service = new WhatsappService();
    const number = this.client?.number || "";
    service.wppInstance?.sendImageAsSticker(number, this.media);
  }
}
