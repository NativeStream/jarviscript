import { Observer, EventData } from "../../../../app";
import events from "../../events";
import cliEvents from "../../../../interfaces/cli/events";
import app from "../../../../app";

class CliCommandMalformated implements Observer {
  event: string = cliEvents.emit.COMMAND_MALFORMATED;

  async callback(eventData: EventData): Promise<void> {
    app.notify(events.WHATSAPP_SEND, {
      ...eventData,
      data: {
        message: eventData.data,
      },
    });
  }
}

export default new CliCommandMalformated();
