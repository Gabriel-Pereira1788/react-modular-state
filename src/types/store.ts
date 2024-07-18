export type Store<State> = {
  closeStore: () => void;
  getState: () => State;
  setState: (newState: State | ((newState: State) => State)) => void;
  subscribe: (callback: () => void) => () => void;
};

export type ReturnStoreKeys<State> = ReturnType<keyof Store<State>["getState"]>;
