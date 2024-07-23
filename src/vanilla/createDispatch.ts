import { Reducer, Store } from "../types";

export function createDispatch<State, Action>(
  store: Store<State>,
  reducer?: Reducer<State, Action>
) {
  return (action: Action) => {
    if (!reducer) throw new Error("Reducer is not defined.");
    const prevState = store.getState();
    const newState = reducer(prevState, action);
    store.setState(newState);
  };
}
