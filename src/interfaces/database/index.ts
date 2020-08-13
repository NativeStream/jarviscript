import { connect } from "mongoose";
import { Service, Observer } from "../../app";
import config from "./config";

class Database implements Service {
  public serviceName: string = "Mongoose";
  public globalInstance?: any;
  public observers: Array<Observer> = [];

  async init(): Promise<void> {
    this.globalInstance = this.getGlobalInstance();
  }

  async getGlobalInstance() {
    if (!this.globalInstance) {
      let auth: string = "";
      if (config.user && config.pass) auth = `${config.user}:${config.pass}@`;

      const node_env = process.env.NODE_ENV || "development";

      const uri = `mongodb://${auth}${config.host}:${config.port}/${config.name}${node_env}`;
      this.globalInstance = await connect(uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
    }
    return this.globalInstance;
  }
}

export default new Database();
