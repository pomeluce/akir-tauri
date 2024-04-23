import { ConfigProviderProps } from '@/rify/provider';

class EventBus {
  private bus: Element;
  private listeners: Record<string, any> = {};
  private subscriptions: Record<string, any> = {};

  constructor() {
    this.bus = document.createElement('fakeElement');
  }

  on(event: string, callback: (this: Element, event: CustomEventInit<ConfigProviderProps>) => any) {
    this.bus.addEventListener(event, callback);
  }

  off(event: string, callback: (this: Element, event: CustomEventInit<ConfigProviderProps>) => any) {
    this.bus.removeEventListener(event, callback);
  }

  emit(event: string, detail = {}) {
    this.bus.dispatchEvent(new CustomEvent<ConfigProviderProps>(event, { detail }));
  }

  get<T>(event: string): T {
    return this.listeners[event];
  }

  set<T>(event: string, data: T) {
    this.listeners[event] = data;
  }

  remove(event: string) {
    delete this.listeners[event];
  }
  public subscribe = <T,>(eventType: string, callback: (detail: T) => any) => {
    if (!this.subscriptions[eventType]) return;
    Object.getOwnPropertySymbols(this.subscriptions[eventType]).forEach(key => callback(this.subscriptions[eventType][key]));
  };

  public publish = <T,>(eventType: string, arg: T) => {
    const id = Symbol('id');
    if (!this.subscriptions[eventType]) this.subscriptions[eventType] = {};
    this.subscriptions[eventType][id] = arg;

    return {
      unsubscribe: () => {
        delete this.subscriptions[eventType][id];
        if (Object.getOwnPropertySymbols(this.subscriptions[eventType]).length === 0) {
          delete this.subscriptions[eventType];
        }
      },
    };
  };
}

export default new EventBus();
