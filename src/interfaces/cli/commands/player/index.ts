import { ICommands } from "../../classes/Command";
import Clear from "./Clear";
import Add from "./Add";
import Goto from "./Goto";
import Play from "./Play";
import Next from "./Next";
import Pause from "./Pause";
import Previous from "./Previous";
import Queue from "./Queue";
import Stop from "./Stop";

const commands: ICommands = {
  ...Play,
  ...Add,
  ...Clear,
  ...Goto,
  ...Next,
  ...Pause,
  ...Previous,
  ...Queue,
  ...Stop,
};

export default commands;
