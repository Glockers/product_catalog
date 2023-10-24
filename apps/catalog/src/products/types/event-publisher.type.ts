export interface IEventPublisher {
  sendEvent(event: unknown): void;
}
