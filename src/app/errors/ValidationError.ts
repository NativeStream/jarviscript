import { Error as MongooseErrors } from "mongoose";
import IFieldError from "./IFieldError";

export default class ValidationError extends Error {
  public message: string = "Validation Error";
  public errors: Array<IFieldError> = [];
  constructor(error: MongooseErrors.ValidationError) {
    super();
    Object.setPrototypeOf(this, ValidationError);
    Object.keys(error.errors).map((key) => {
      const prop = error.errors[key];
      this.errors.push({
        field: prop.path,
        message: prop.message,
        value: prop.value,
        kind: prop.kind,
      });
    });
  }
}
