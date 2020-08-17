import { ICommands } from "../classes/Command";
import PlayerCommands from "./player";
import WppCommands from "./whatsapp";
import General from "./general";

const commands: ICommands = { ...PlayerCommands, ...WppCommands, ...General };

export default commands;
