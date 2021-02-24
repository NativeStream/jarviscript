import { AppSubject } from "./../../../AppSubject";
import { WhatsappService } from "./../WhatsappService";
import { AbstractCommand } from "../../../resources/AbstractCommand";
import { ChatId } from "@open-wa/wa-automate";
import { WhatsappNewStickerEvent } from "../types";
import sharp from "sharp";

export default class sticker extends AbstractCommand {
  public async action(): Promise<void> {
    const service = new WhatsappService();
    const number = this.client?.number || "";
    const app = AppSubject.getInstance();
    if (this.media) {
      const [mediaMime, mediaData]: string[] = this.media.split("base64,");
      if (mediaMime.includes("image")) {
        const mediaBuffer = Buffer.from(mediaData, "base64");
        const newImageBuffer = await sharp(mediaBuffer)
          .toFormat("png")
          .resize(300, 300, {
            fit: "contain",
            background: { alpha: 0, r: 255, b: 255, g: 255 },
          })
          .toBuffer();

        const newImageData = newImageBuffer.toString("base64");
        const b64Image = `data:image/png;base64,${newImageData}`;
        service.wppInstance?.sendImageAsSticker(number as ChatId, b64Image, {
          author: "Jarvis",
          pack: "Voldemort",
        });
        app.notify(new WhatsappNewStickerEvent({ b64Image }));
      }
    }
  }
}
