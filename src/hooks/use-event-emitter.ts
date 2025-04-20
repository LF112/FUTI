// eslint-disable-next-line react-compiler/react-compiler
/* eslint-disable react-hooks/rules-of-hooks */
import { useEffect, useRef } from 'react';

type SubscriptionEventName = string | symbol;
type Subscription<N extends SubscriptionEventName, T = unknown> = (eventName: N, val?: T) => void | Promise<any>;

export class EventEmitter<N extends SubscriptionEventName, T = unknown> {
  private subscriptions = new Set<Subscription<N, T>>();

  emit = async (eventName: N, val?: T): Promise<void> => {
    const promises: Promise<any>[] = [];

    for (const subscription of this.subscriptions) {
      const result = subscription(eventName, val);
      if (result instanceof Promise) {
        promises.push(result);
      }
    }

    if (promises.length > 0) {
      await Promise.all(promises);
    }
  };

  useSubscription = (callback: Subscription<N, T>) => {
    const callbackRef = useRef<Subscription<N, T>>(void 0);
    callbackRef.current = callback;

    useEffect(() => {
      const subscription = async (eventName: N, val?: T) => {
        if (callbackRef.current) {
          return callbackRef.current(eventName, val);
        }
      };
      this.subscriptions.add(subscription);
      return () => {
        this.subscriptions.delete(subscription);
      };
    }, []);
  };
}

const useEventEmitter = <N extends SubscriptionEventName, T = unknown>() => {
  const ref = useRef<EventEmitter<N, T>>(void 0);
  if (!ref.current) {
    ref.current = new EventEmitter<N, T>();
  }
  return ref.current;
};

export default useEventEmitter;
