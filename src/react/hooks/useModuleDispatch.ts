import { Store } from "../../vanilla";

export function useModuleDispatch<State>(store: Store<State>) {
  function dispatch(newState: Partial<State>) {
    store.setState((prevState) => ({ ...prevState, ...newState }));
  }

  return dispatch;
}
