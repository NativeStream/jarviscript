import { EventData, Observer } from "../../../app";
import LoggerBuilder from "../../../logs/LoggerBuilder";
import CliController from "../controllers/CliController";
import events from "../events";

class CliQuery implements Observer {
  event: string = events.request.REQUEST_CLI_QUERY;

  callback(eventData?: EventData) {
    if (eventData?.data) {
      const cliController = new CliController(eventData);
      cliController.exec();
    }
  }
}

export default new CliQuery();
