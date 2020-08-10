import { Observer, EventData } from "../../../app";
import LoggerBuilder from "../../../logs/LoggerBuilder";
import PlayerController from "../controllers/PlayerController";

class Append implements Observer {
  event: string = "PLAYER_APPEND";
  callback(eventData: EventData): void {
    const query = eventData.data.query;
    if (!query) {
      const error = new Error("No query provided to append player.");
      LoggerBuilder.ERROR("No query provided", error);
      throw error;
    }
    PlayerController.append(query);
  }
}

export default new Append();
