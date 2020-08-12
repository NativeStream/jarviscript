export default class OutOfBoundsPlaylistError extends Error {
  public name: string = "OutOfBoundsPlaylistError";
  constructor(message?: string) {
    super(message);
    Object.setPrototypeOf(this, OutOfBoundsPlaylistError.prototype);
  }
}
