import { EventData } from "../../../../app";
import Command, { iEventDatas } from "../../classes/Command";
import playerEvents from "../../../../interfaces/player/events";

class Pause extends Command {
  public help: string = "Pausa a música atual";
  public validate(eventData: EventData, args: string): boolean {
    return true;
  }
  public async retrive(
    eventData: EventData,
    args: string
  ): Promise<iEventDatas> {
    return {
      eventData,
      event: playerEvents.request.REQUEST_PLAYER_PAUSE,
    };
  }
}

export default {
  PAUSE: new Pause(),
};
