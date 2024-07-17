import { createStore } from "../vanilla/createStore";
import { createDispatch, createUseModuleState } from "../vanilla";
import { Reducer } from "../types";

/* eslint-disable @typescript-eslint/no-explicit-any */

export function create<
  State extends Record<string, any>,
  Payload = undefined,
  Type = undefined
>(initialState: State, reducer?: Reducer<State, Payload, Type>) {
  const store = createStore(initialState);

  const useModuleState = createUseModuleState(store);

  const useModuleDispatch = () => createDispatch(store, reducer);
  return [store, useModuleState, useModuleDispatch] as const;
}
