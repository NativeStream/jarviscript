export enum status {
  PLAYING = "PLAYING",
  PAUSED = "PAUSED",
  STOPED = "STOPED",
}

export default class Player {
  public index: number = 0;
  public songs: Array<any> = [];
  public status: status = status.STOPED;

  setStatusPlaying() {
    this.status = status.PLAYING;
  }
  setStatusPaused() {
    this.status = status.PAUSED;
  }
  setStatusStoped() {
    this.status = status.STOPED;
  }
}
