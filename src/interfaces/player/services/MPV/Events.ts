import app from "../../../../app";

const events = {
  "eof-reached": (value: any) => {
    if (value) app.notify("PLAYER_NEXT");
  },
  // pause: (value: any) => {
  //   if (value) app.notify("PLAYER_PAUSE");
  // },
};

interface IEventStatus {
  property: string;
  value: any;
}

const defaultEvents: Array<string> = [
  "mute",
  "pause",
  "duration",
  "volume",
  "filename",
  "path",
  "media-title",
  "playlist-pos",
  "playlist-count",
  "loop",
];

function handleEvent({ property, value }: IEventStatus) {
  const callback: Function = events[property];
  if (callback) callback(value);
}

export function registerEvents(mpv: any) {
  Object.keys(events).forEach((property) => {
    if (!defaultEvents.includes(property)) mpv.observeProperty(property);
  });
  mpv.on("status", handleEvent);
}