import { Action, Reducer, Store } from "../types";

export function createDispatch<State, Payload, Type>(
  store: Store<State>,
  reducer?: Reducer<State, Payload, Type>
) {
  return (action: Action<Type, Payload>) => {
    if (!reducer) throw new Error("Reducer is not defined.");
    const prevState = store.getState();
    const newState = reducer(prevState, action);
    store.setState(newState);
  };
}
