import { Message, Chat } from "@open-wa/wa-automate";
import MessageHandler from "./utils/MessageHandler";
import LoggerBuilder from "../../logs/LoggerBuilder";

interface IEvent<callback> {
  [propery: string]: callback;
}

const events: IEvent<Function> = {
  onAck: (message: Message) => {},
  onAddedToGroup: (chat: Chat) => {},
  onAnyMessage: async (message: Message) => {
    LoggerBuilder.DEBUG("WHATSAPP RECIVED MESSAGE:", message.body);
    MessageHandler.handle(message);
  },
  onBattery: (battery: number) => {},
  onChatOpened: (chat: Chat) => {},
  // onChatState: (chatState: any) => {},
  // onContactAdded: (data: any) => {},
  onGlobalParicipantsChanged: (participantChangedEvent: any) => {},
  onIncomingCall: (call: any) => {},
  // onLiveLocation: (liveLocationChangedEvent: any) => {},
  onMessage: (message: Message) => {},
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
