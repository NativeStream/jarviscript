import { EventData } from "../../../../app";
import Command, { iEventDatas } from "../../classes/Command";

class Play extends Command {
  public help: string = "";
  public validate(eventData: EventData, args: string): boolean {
    throw new Error("Method not implemented.");
  }
  public retrive(eventData: EventData, args: string): Promise<iEventDatas> {
    throw new Error("Method not implemented.");
  }
}

export default {
  PLAY: new Play(),
  P: new Play(),
};
