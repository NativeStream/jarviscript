import { LoggerService } from "./../../../logs/LoggerService";
import { Chat, Client, Events, Message } from "@open-wa/wa-automate";
import onMessage from "./events/onMessage";

interface IWppEvents {
  [propery: string]: Function;
}

export class WhatsappeventListeners {
  private events: IWppEvents = {
    onAck: (message: Message) => {},
    onAddedToGroup: (chat: Chat) => {},
    onAnyMessage: async (message: Message) => {},
    onBattery: (battery: number) => {},
    onChatOpened: (chat: Chat) => {},
    // onChatState: (chatState: any) => {}, // paid feature
    // onContactAdded: (data: any) => {}, // paid feature
    onGlobalParicipantsChanged: (participantChangedEvent: any) => {},
    onIncomingCall: (call: any) => {},
    // onLiveLocation: (liveLocationChangedEvent: any) => {},
    onMessage,
    // onParticipantsChanged: (participantChangedEvent: any) => {},
    onPlugged: (plugged: boolean) => {},
    // onRemovedFromGroup: (data: any) => {}, // paid feature
    onStateChanged: (state: string) => {},
    onStory: (story: any) => {},
  };

  constructor(private wppClient: Client, public logger: LoggerService) {
    logger.DEBUG("Registering Whatsapp listeners...");
    Object.keys(this.events).forEach((event) => {
      const callback: Function = this.events[event];
      (this.wppClient as any)[event](callback);
    });
    logger.DEBUG("Registering Whatsapp listeners done!");
  }
}
