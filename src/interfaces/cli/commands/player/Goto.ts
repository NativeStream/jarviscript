import { EventData } from "../../../../app";
import Command, { iEventDatas } from "../../classes/Command";
import playerEvents from "../../../../interfaces/player/events";

class Goto extends Command {
  public help: string = "Vai para a música no indice indicado";
  public validate(eventData: EventData, args: string): boolean {
    const number = parseInt(args);
    return !isNaN(number);
  }
  public async retrive(
    eventData: EventData,
    args: string
  ): Promise<iEventDatas> {
    const number = parseInt(args);
    return {
      eventData: {
        ...eventData,
        data: number,
      },
      event: playerEvents.request.REQUEST_PLAYER_GOTO,
    };
  }
}

export default {
  GOTO: new Goto(),
};
