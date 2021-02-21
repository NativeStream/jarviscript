import { ICommandsMap } from "../../../interfaces/ICommandsList";
import cmd from "./cmd";
import sticker from "./sticker";

export const whatsappCommands: ICommandsMap = {
  cmd: new cmd(),

  sticker: new sticker(),
  figurinha: new sticker()

  
};
