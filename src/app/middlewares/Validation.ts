import ValidationError from "../errors/ValidationError";
import DuplicatedEntryError from "../errors/DuplicatedEntryError";
import { Error } from "mongoose";

export default class Validation {
  public static validate(error: any, doc: any, next: any) {
    if (error.name == "MongoError" && error.code == 11000) {
      next(new DuplicatedEntryError(error));
    } else if (error instanceof Error.ValidationError) {
      next(new ValidationError(error));
    }
  }
}
