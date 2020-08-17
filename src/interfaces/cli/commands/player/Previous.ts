import { EventData } from "../../../../app";
import Command, { iEventDatas } from "../../classes/Command";
import playerEvents from "../../../../interfaces/player/events";

class Previous extends Command {
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
      event: playerEvents.request.REQUEST_PLAYER_PREVIOUS,
    };
  }
}

export default {
  PREVIOUS: new Previous(),
  PREV: new Previous(),
  ANTERIOR: new Previous(),
};
