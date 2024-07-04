import { useRef } from "react";
import { createModuleStore, Store } from "../vanilla/createModuleState";

type ProviderProps<State> = {
  Context: React.Context<Store<State>>;
  initialState: State;
} & React.PropsWithChildren;

export function Provider<State>({
  Context,
  children,
  initialState,
}: ProviderProps<State>) {
  const storeRef = useRef<Store<State>>();

  if (!storeRef.current) {
    storeRef.current = createModuleStore(initialState);
  }
  return (
    <Context.Provider value={storeRef.current}>{children}</Context.Provider>
  );
}
