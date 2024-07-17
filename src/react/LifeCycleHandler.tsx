import { useEffect } from "react";
import { Store } from "../vanilla";

type Props<State> = {
  store: Store<State>;
};
export const LifeCycleHandler = <State,>({
  children,
  store,
}: Props<State> & React.PropsWithChildren) => {
  useEffect(() => {
    return () => store.clearStore();
  }, []);
  return <>{children}</>;
};
