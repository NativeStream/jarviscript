import app, { Observer, EventData } from "../../../app";
import LoggerBuilder from "../../../logs/LoggerBuilder";
import PlayerController from "../controllers/PlayerController";
import events from "../events";

class Append implements Observer {
  event: string = events.request.REQUEST_PLAYER_APPEND;
  async callback(eventData: EventData) {
    const query = eventData.data.query;
    if (!query) {
      const error = new Error("No query provided to append player.");
      LoggerBuilder.ERROR("No query provided", error);
      throw error;
    }
    const fetched = await PlayerController.append(query);
    app.notify(events.emit.EMIT_PLAYER_APPEND, {
      ...eventData,
      data: fetched,
    });
    app.notify(events.request.REQUEST_PLAYER_PLAY, eventData);
  }
}

export default new Append();
