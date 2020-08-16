import { ICommands } from "../classes/Command";
import PlayerCommands from "./player";
import WppCommands from "./whatsapp";

const commands: ICommands = { ...PlayerCommands, ...WppCommands };

export default commands;
