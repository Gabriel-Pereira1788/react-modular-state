/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMemo } from "react";
import { Store } from "../../vanilla/createStore";
import { useSubscription } from "use-subscription";

export function useModuleValue<State, S>(
  store: Store<State>,
  selector: (state: State) => S
) {
  return useSubscription(
    useMemo(
      () => ({
        getCurrentValue: () => selector(store.getState()),
        subscribe: store.subscribe,
      }),
      [store, selector]
    )
  );
}

export function useModuleSetValue<
  State extends Record<string, any>,
  StateKey extends keyof State
>(store: Store<State>, stateKey: StateKey) {
  function setState(value: State[StateKey]) {
    store.setState((prev) => ({
      ...prev,
      [stateKey]: value,
    }));
  }

  return setState;
}
