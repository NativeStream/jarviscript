import { AbstractCommand } from "../resources/AbstractCommand";
import { execSync } from "child_process";

export default class cmd extends AbstractCommand {
  public validate(): boolean {
    return this.client?.role === "owner";
  }

  public async action(): Promise<string> {
    const args = this.args || [];
    return execSync(args.join(" "), { encoding: "ascii" });
  }
}
