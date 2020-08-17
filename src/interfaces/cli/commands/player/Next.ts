import { EventData } from "../../../../app";
import Command, { iEventDatas } from "../../classes/Command";
import playerEvents from "../../../../interfaces/player/events";

class Next extends Command {
  public help: string = "Pula a música atual";
  public validate(eventData: EventData, args: string): boolean {
    return true;
  }
  public async retrive(
    eventData: EventData,
    args: string
  ): Promise<iEventDatas> {
    return {
      eventData,
      event: playerEvents.request.REQUEST_PLAYER_NEXT,
    };
  }
}

export default {
  NEXT: new Next(),
  PROXIMO: new Next(),
};
