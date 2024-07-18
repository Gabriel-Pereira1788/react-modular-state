/* eslint-disable @typescript-eslint/no-explicit-any */
import { useModuleSetValue, useModuleValue } from "../react/hooks";
import { Store } from "../types";

export function createUseModuleState<State extends Record<string, any>>(
  store: Store<State>
) {
  return (stateKey: keyof State) => {
    return [
      useModuleValue(store, (state) => state[stateKey]),
      useModuleSetValue(store, stateKey),
    ] as const;
  };
}
