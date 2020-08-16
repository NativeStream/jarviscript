import app, { EventData } from "../../../app";
import LoggerBuilder from "../../../logs/LoggerBuilder";
import { ICommandData } from "../classes/Command";
import commands from "../commands";
import events from "../events";

export default class CliController {
  public data: any;
  public query: string;
  public eventData: EventData;

  constructor(eventData: EventData) {
    const commandData: ICommandData = eventData.data;
    this.data = commandData.body;
    this.query = commandData.query;
    this.eventData = eventData;
  }

  public async exec() {
    const match = this.query.match(
      /(?<command>(?<=^[\.\-!]).[^ ]+)((?: )(?<query>.+))?/
    );
    const command = match?.groups?.command?.toUpperCase();
    const query = match?.groups?.query || "";

    if (command && commands[command]) {
      const executor = commands[command];
      if (executor.validate(this.eventData, query, this.data)) {
        const data = await executor.retrive(this.eventData, query, this.data);
        app.notify(data.event, data.eventData);
      } else {
        const help = executor.help;
        const newEventData = {
          ...this.eventData,
          data: help,
        };
        app.notify(events.emit.COMMAND_MALFORMATED, newEventData);
      }
    }
  }
}
