import { EventData } from "../../../../app";
import Command, { iEventDatas } from "../../classes/Command";
import playerEvents from "../../../../interfaces/player/events";

class Queue extends Command {
  public help: string = "Mostra as músicas na fila";
  public validate(eventData: EventData, args: string): boolean {
    return true;
  }
  public async retrive(
    eventData: EventData,
    args: string
  ): Promise<iEventDatas> {
    return {
      eventData,
      event: playerEvents.request.REQUEST_PLAYER_PLAYLIST,
    };
  }
}

export default {
  QUEUE: new Queue(),
  Q: new Queue(),
};
