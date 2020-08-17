import { connect } from "mongoose";
import { Service, Observer } from "../../app";
class Database implements Service {
  public serviceName: string = "Mongoose";
  public globalInstance?: any;
  public observers: Array<Observer> = [];

  async init(): Promise<void> {
    this.globalInstance = this.getGlobalInstance();
  }

  async getGlobalInstance() {
    if (!this.globalInstance) {
      const uri =
        process.env.DATABASE_URL || "mongodb://localhost:27017/jarvis";

      this.globalInstance = await connect(uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
    }
    return this.globalInstance;
  }
}

export default new Database();
