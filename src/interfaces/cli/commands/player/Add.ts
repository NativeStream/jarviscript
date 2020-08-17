import { EventData } from "../../../../app";
import Command, { iEventDatas } from "../../classes/Command";
import playerEvents from "../../../../interfaces/player/events";

class Add extends Command {
  public help: string = "Adiciona a playlist";
  public validate(eventData: EventData, args: string): boolean {
    return Boolean(args);
  }
  public async retrive(
    eventData: EventData,
    args: string
  ): Promise<iEventDatas> {
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
}

export default {
  ADD: new Add(),
};
