import { DomainEvent } from '../workout/events/WorkoutEvents';

export type EventHandler<T extends DomainEvent = DomainEvent> = (event: T) => void | Promise<void>;

export class EventBus {
  private static instance: EventBus;
  private handlers: Map<string, EventHandler[]> = new Map();

  private constructor() {}

  static getInstance(): EventBus {
    if (!EventBus.instance) {
      EventBus.instance = new EventBus();
    }
    return EventBus.instance;
  }

  subscribe<T extends DomainEvent>(eventName: string, handler: EventHandler<T>): () => void {
    if (!this.handlers.has(eventName)) {
      this.handlers.set(eventName, []);
    }
    this.handlers.get(eventName)!.push(handler as EventHandler);

    return () => {
      const currentHandlers = this.handlers.get(eventName) || [];
      this.handlers.set(
        eventName,
        currentHandlers.filter((h) => h !== handler)
      );
    };
  }

  async publish<T extends DomainEvent>(event: T): Promise<void> {
    const eventHandlers = this.handlers.get(event.eventName) || [];
    for (const handler of eventHandlers) {
      try {
        await handler(event);
      } catch (err) {
        console.error(`Error handling event ${event.eventName}:`, err);
      }
    }
  }

  clear(): void {
    this.handlers.clear();
  }
}
