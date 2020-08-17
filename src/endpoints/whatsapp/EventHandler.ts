import { Message, Chat } from "@open-wa/wa-automate";
import LoggerBuilder from "../../logs/LoggerBuilder";
import { REQUEST_CLI_QUERY } from "../../interfaces/cli/events/types";
import cliEvents from "../../interfaces/cli/events";
import app from "../../app";

interface IEvent<callback> {
  [propery: string]: callback;
}

const events: IEvent<Function> = {
  onAck: (message: Message) => {},
  onAddedToGroup: (chat: Chat) => {},
  onAnyMessage: async (message: Message) => {
    // LoggerBuilder.DEBUG("Any message recived:", message.body);
    // MessageHandler.handle(message);
  },
  onBattery: (battery: number) => {},
  onChatOpened: (chat: Chat) => {},
  // onChatState: (chatState: any) => {},
  // onContactAdded: (data: any) => {},
  onGlobalParicipantsChanged: (participantChangedEvent: any) => {},
  onIncomingCall: (call: any) => {},
  // onLiveLocation: (liveLocationChangedEvent: any) => {},
  onMessage: (message: Message) => {
    LoggerBuilder.DEBUG("Only message recived:", message.body);

    const body = message.body;
    const caption = message.caption;

    const data: REQUEST_CLI_QUERY = {
      query: caption || body,
      body: message,
    };

    app.notify(cliEvents.request.REQUEST_CLI_QUERY, {
      user: message.from,
      data,
    });
  },
  // onParticipantsChanged: (participantChangedEvent: any) => {},
  onPlugged: (plugged: boolean) => {},
  // onRemovedFromGroup: (data: any) => {},
  onStateChanged: (state: string) => {},
  onStory: (story: any) => {},
};

export function registerEvents(client: any) {
  Object.keys(events).forEach((event: string) => {
    const callback: Function = events[event];
    client[event](callback);
  });
}
