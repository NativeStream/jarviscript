import { WhatsappService } from './../WhatsappService';
import { AbstractCommand } from "../../../resources/AbstractCommand";
import { ChatId } from '@open-wa/wa-automate';

export default class sticker extends AbstractCommand {
  public async action(): Promise<void> {
    const service = new WhatsappService();
    const number = this.client?.number || "";
    // @ts-ignore
    service.wppInstance?.sendImageAsSticker(number as ChatId, this.media);
  }
}
