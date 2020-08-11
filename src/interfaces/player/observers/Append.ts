import app, { Observer, EventData } from "../../../app";
import LoggerBuilder from "../../../logs/LoggerBuilder";
import PlayerController from "../controllers/PlayerController";
import events from "../events";

class Append implements Observer {
  event: string = events.PLAYER_APPEND;
  async callback(eventData: EventData) {
    const query = eventData.data.query;
    if (!query) {
      const error = new Error("No query provided to append player.");
      LoggerBuilder.ERROR("No query provided", error);
      throw error;
    }
    const data = await PlayerController.append(query);
    app.notify(events.PLAYER_QUERY_ADDED, {
      ...eventData,
      data,
    });
  }
}

export default new Append();
