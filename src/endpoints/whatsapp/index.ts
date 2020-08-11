import { Service, Observer } from "../../app";
import { create, Client } from "@open-wa/wa-automate";
import { registerEvents } from "./EventHandler";
import observers from "./observers";

class Whatsapp implements Service {
  public globalInstance: Client;
  public observers: Array<Observer> = observers;
  public serviceName: string = "Whatsapp";

  public async init(): Promise<void> {
    const client: Client = await create();

    registerEvents(client);

    this.globalInstance = client;
  }
}

export default new Whatsapp();
