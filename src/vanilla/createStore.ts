import { Store } from "../types";

export function createStore<State>(initialState: State): Store<State> {
  let state: State | null = initialState;

  const listeners = new Set<() => void>();

  const getState = () => {
    if (!state) throw new Error("State is null.");
    return state;
  };
  const setState: Store<State>["setState"] = (nextState) => {
    const newState =
      typeof nextState === "function"
        ? (nextState as (newState: State) => State)(state!)
        : nextState;

    state = newState;

    listeners.forEach((listener) => listener());
  };

  const closeStore = () => {
    listeners.clear();
    state = initialState;
  };
  const subscribe: Store<State>["subscribe"] = (callback) => {
    listeners.add(callback);

    return () => {
      listeners.delete(callback);
    };
  };

  return {
    closeStore,
    getState,
    setState,
    subscribe,
  };
}
