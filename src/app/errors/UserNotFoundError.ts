export default class UserNotFoundError extends Error {
  public message: string = "User Not found";
  constructor() {
    super();
    Object.setPrototypeOf(this, UserNotFoundError);
  }
}
