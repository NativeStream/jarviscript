export default class PlaylistEmptyError extends Error {
  public name: string = "PlaylistEmptyError";
  constructor(message?: string) {
    super(message);
    Object.setPrototypeOf(this, PlaylistEmptyError.prototype);
  }
}
