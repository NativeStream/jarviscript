import { EventData } from "../../../../app";
import Command, { iEventDatas } from "../../classes/Command";
import playerEvents from "../../../../interfaces/player/events";

class Play extends Command {
  public help: string =
    "Adiciona uma música ou dá play se nenhuma for informada";
  public validate(eventData: EventData, args: string): boolean {
    return true;
  }
  public async retrive(
    eventData: EventData,
    args: string
  ): Promise<iEventDatas> {
    if (args) {
      return {
        eventData: {
          ...eventData,
          data: {
            query: args,
          },
        },
        event: playerEvents.request.REQUEST_PLAYER_APPEND,
      };
    }
    return {
      eventData,
      event: playerEvents.request.REQUEST_PLAYER_PLAY,
    };
  }
}

export default {
  PLAY: new Play(),
  P: new Play(),
};
