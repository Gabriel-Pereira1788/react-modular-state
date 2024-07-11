import { createContext, useRef } from "react";
import { createStore, Store } from "../vanilla/createStore";
import { createUseModuleState } from "../vanilla";

/* eslint-disable @typescript-eslint/no-explicit-any */
export function create<State extends Record<string, any>>(initialState: State) {
  const Context = createContext<Store<State> | null>(null);
  const store = createStore(initialState);
  const Provider = ({ children }: React.PropsWithChildren) => {
    const storeRef = useRef<Store<State>>();

    if (!storeRef.current) {
      storeRef.current = store;
    }

    return (
      <Context.Provider value={storeRef.current}>{children}</Context.Provider>
    );
  };

  const useModuleState = createUseModuleState(store);

  return [Provider, useModuleState] as const;
}
