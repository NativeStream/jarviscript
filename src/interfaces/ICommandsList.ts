import { AbstractCommand } from "../resources/AbstractCommand";

class ObjectiveCommand extends AbstractCommand {
  public action(): Promise<any> {
    throw new Error("Method not implemented.");
  }
}

export interface ICommandsMap {
  [index: string]: ObjectiveCommand
}
