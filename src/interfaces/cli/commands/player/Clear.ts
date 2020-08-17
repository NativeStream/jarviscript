import { EventData } from "../../../../app";
import Command, { iEventDatas } from "../../classes/Command";
import playerEvents from "../../../../interfaces/player/events";

class Clear extends Command {
  public help: string = "Vai para a música anterior";
  public validate(eventData: EventData, args: string): boolean {
    return true;
  }
  public async retrive(
    eventData: EventData,
    args: string
  ): Promise<iEventDatas> {
    return {
      eventData,
      event: playerEvents.request.REQUEST_PLAYER_CLEAR,
    };
  }
}

export default {
  CLEAR: new Clear(),
  LIMPAR: new Clear(),
};
