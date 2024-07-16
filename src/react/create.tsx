import { useEffect } from "react";
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

  const LifeCycleController = ({ children }: React.PropsWithChildren) => {
    useEffect(() => {
      return () => store.clearStore();
    }, []);
    return <>{children}</>;
  };

  const useModuleDispatch = () => {
    return createDispatch(store, reducer!);
  };
  const useModuleState = createUseModuleState(store);

  return [LifeCycleController, useModuleState, useModuleDispatch] as const;
}
