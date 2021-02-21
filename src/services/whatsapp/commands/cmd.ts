import { WhatsappService } from './../WhatsappService';

import { execSync } from "child_process";
import { AbstractCommand } from "../../../resources/AbstractCommand";

export default class cmd extends AbstractCommand {
  // public validate(): boolean {
  //   return this.client?.role === "owner";
  // }

  public async action(): Promise<void> {
    const args = this.args || [];
    const response = execSync(args.join(" "), { encoding: "ascii" });
    const service = new WhatsappService();
    service.wppInstance?.sendText(this.client?.number || "", response);
  }
}
