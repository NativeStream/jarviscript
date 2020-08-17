import { EventData } from "../../../../app";
import Command, { iEventDatas } from "../../classes/Command";
import { execSync } from "child_process";
import events from "../../events";

class Cmd extends Command {
  public help: string = "Envie um comando para ser executado no host.";
  public validate(
    eventData: EventData,
    query: string,
    extraData?: any
  ): boolean {
    if (query) return true;
    return false;
  }
  public async retrive(
    eventData: EventData,
    query: string,
    extraData?: any
  ): Promise<iEventDatas> {
    const user = eventData.user;
    const role = user?.role;

    let stdout;

    if (role === "owner") stdout = execSync(query, { encoding: "ascii" });
    else stdout = "Usuário sem permissão.";

    return {
      eventData: {
        ...eventData,
        data: stdout,
      },
      event: events.emit.EMIT_COMMAND_RESPONSE,
    };
  }
}

export default {
  CMD: new Cmd(),
};
