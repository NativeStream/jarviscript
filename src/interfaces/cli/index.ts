import { Observer, Service } from "../../app";
import observers from "./observers";

class Cli implements Service {
  globalInstance?: any;
  observers: Observer[] = observers;
  serviceName: string = "Cli";

  async init(): Promise<void> {
    return undefined;
  }

  getGlobalInstance() {}
}

export default new Cli();
