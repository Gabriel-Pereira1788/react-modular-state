import { createUseModuleState, Store } from "../../vanilla";

/* eslint-disable @typescript-eslint/no-explicit-any */
export function useModuleState<State extends Record<string, any>>(
  store: Store<State>
) {
  return createUseModuleState(store);
}
