/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useReducer } from "react";
import { Store } from "../../vanilla/createStore";

export function useModuleValue<State, S>(
  store: Store<State>,
  selector: (state: State) => S
) {
  const [currentValue, rerender] = useReducer((prev) => {
    const newValue = selector(store.getState());

    if (prev === newValue) {
      return prev;
    }

    return newValue;
  }, selector(store.getState()));

  useEffect(() => {
    const unsubscribe = store.subscribe(() => {
      rerender();
    });

    return unsubscribe;
  }, []);

  return currentValue as S;
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
