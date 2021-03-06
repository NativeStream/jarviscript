import { Service, Observer } from "../../app";
import { create, Client, ConfigObject } from "@open-wa/wa-automate";
import { registerEvents } from "./EventHandler";
import observers from "./observers";

class Whatsapp implements Service {
  public globalInstance?: Client;
  public observers: Array<Observer> = observers;
  public serviceName: string = "Whatsapp";
  private config: ConfigObject = {
    executablePath: process.env.CHROMIUM,
    sessionDataPath: "/session/session.data.json",
    disableSpins: true,
    // popup: 8001
  };

  public async init(): Promise<void> {
    const client: Client = await this.getGlobalInstance();

    registerEvents(client);

    this.globalInstance = client;
  }

  async getGlobalInstance(): Promise<Client> {
    if (!this.config.executablePath)
      delete this.config.executablePath;

    if (!this.globalInstance) this.globalInstance = await create(this.config);
    return this.globalInstance;
  }
}

export default new Whatsapp();
