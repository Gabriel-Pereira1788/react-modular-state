export type Store<State> = {
  clearStore: () => void;
  getState: () => State;
  setState: (newState: State | ((newState: State) => State)) => void;
  subscribe: (callback: () => void) => () => void;
};

export function createStore<State>(initialState: State): Store<State> {
  let state = initialState;

  const listeners = new Set<() => void>();

  const getState = () => state;
  const setState: Store<State>["setState"] = (nextState) => {
    const newState =
      typeof nextState === "function"
        ? (nextState as (newState: State) => State)(state)
        : nextState;

    state = newState;

    listeners.forEach((listener) => listener());
  };

  const clearStore = () => {
    listeners.clear();
  };
  const subscribe: Store<State>["subscribe"] = (callback) => {
    listeners.add(callback);

    return () => {
      listeners.delete(callback);
    };
  };

  return {
    clearStore,
    getState,
    setState,
    subscribe,
  };
}
