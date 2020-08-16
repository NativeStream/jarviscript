import { decryptMedia } from "@open-wa/wa-decrypt";
import { Message } from "@open-wa/wa-automate";
import Command, { iEventDatas } from "../../classes/Command";
import { EventData } from "../../../../app";
import wppEvents from "../../../../endpoints/whatsapp/events";

class Sticker extends Command {
  public help: string = "Envie junto com uma imagem ou prosseguido de um link";
  public validate(
    eventData: EventData,
    query: string,
    extraData?: any
  ): boolean {
    const message: Message = extraData;
    return Boolean(message.mimetype || query);
  }
  public async retrive(
    eventData: EventData,
    query: string,
    extraData?: any
  ): Promise<iEventDatas> {
    let event;
    let data;

    const message: Message = extraData;
    if (message.mimetype) {
      const mediaData = await decryptMedia(message);
      const imageBase64 = `data:${message.mimetype};base64,${mediaData.toString(
        "base64"
      )}`;
      data = imageBase64;
      event = wppEvents.WHATSAPP_SEND_IMAGE_AS_STICKER;
    } else {
      data = query;
      event = wppEvents.WHATSAPP_SEND_URL_AS_STICKER;
    }

    return {
      eventData: {
        ...eventData,
        data,
      },
      event,
    };
  }
}

export default {
  STICKER: new Sticker(),
  FIGURINHA: new Sticker(),
};
