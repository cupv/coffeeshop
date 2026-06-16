export const BARISTA_EVENT_HANDLER_TOKEN = Symbol(
  'BARISTA_EVENT_HANDLER_TOKEN',
);

export interface BaristaEventHandlerPort {
  publish(): Promise<boolean>;
}
