/* eslint-disable @typescript-eslint/no-explicit-any */
import { useModuleSetValue, useModuleValue } from "../react/hooks";
import { Store } from "../types";

export function createUseModuleState<State extends Record<string, any>>(
  store: Store<State>
) {
  return <K extends keyof State>(stateKey: K) => {
    const selector = (state: State): State[K] => state[stateKey];
    return [
      useModuleValue(store, selector),
      useModuleSetValue(store, stateKey),
    ] as const;
  };
}
