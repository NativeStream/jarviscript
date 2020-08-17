import { EventData } from "../../../../app";
import Command, { iEventDatas } from "../../classes/Command";
import playerEvents from "../../../../interfaces/player/events";

class Stop extends Command {
  public help: string = "Para a reprodução e vai para o inicio";
  public validate(eventData: EventData, args: string): boolean {
    return true;
  }
  public async retrive(
    eventData: EventData,
    args: string
  ): Promise<iEventDatas> {
    return {
      eventData,
      event: playerEvents.request.REQUEST_PLAYER_STOP,
    };
  }
}

export default {
  STOP: new Stop(),
  PARAR: new Stop(),
};
