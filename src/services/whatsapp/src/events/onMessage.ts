import { WhatsappService } from "./../../WhatsappService";
import { decryptMedia, Message } from "@open-wa/wa-automate";
import { CommandManager } from "../../../../resources/CommandManager";
import { whatsappCommands } from "../../commands";

export default async (message: Message) => {
  const service = new WhatsappService();
  let text = "";
  let media;

  if (message.type === "chat") text = message.body;
  else {
    text = message.caption;
    const mediaData = await decryptMedia(message);
    media = `data:${message.mimetype};base64,${mediaData.toString("base64")}`;
  }

  const manager = CommandManager.create(
    text,
    { number: message.from },
    whatsappCommands
  );
  if (media) manager.addMedia(media);

  service.logger.DEBUG("Command recived:", {
    from: message.from,
    message: text,
    hasMedia: message.type !== "chat",
  });

  await manager.execute();
};
