import { Observer, EventData } from "../../../../app";
import events from "../../events";
import cliEvents from "../../../../interfaces/cli/events";
import app from "../../../../app";

class CliCommandResponse implements Observer {
  event: string = cliEvents.emit.EMIT_COMMAND_RESPONSE;

  async callback(eventData: EventData): Promise<void> {
    app.notify(events.WHATSAPP_SEND, {
      ...eventData,
      data: {
        message: eventData.data,
      },
    });
  }
}

export default new CliCommandResponse();
