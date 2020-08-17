import IFieldError from "./IFieldError";

export default class DuplicatedEntryError extends Error {
  public message: string = "Duplicated Entry.";
  public errors: Array<IFieldError> = [];
  constructor(error: any) {
    super();
    Object.setPrototypeOf(this, DuplicatedEntryError);
    const fields = Object.keys(error.keyPattern);
    fields.forEach((field) => {
      const value = error.keyValue[field];
      this.errors.push({
        field,
        kind: "duplicated",
        message: `The field ${field} was already taken.`,
        value,
      });
    });
  }
}
