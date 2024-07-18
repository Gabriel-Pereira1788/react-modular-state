/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { memo, useEffect } from "react";
import { Store } from "../types";

type Props<State> = {
  store: Store<State>;
};
function LifeCycleHandlerNoMemo({
  children,
  store,
}: Props<any> & React.PropsWithChildren) {
  useEffect(() => {
    return () => store.closeStore();
  }, []);
  return <>{children}</>;
}

export const LifeCycleHandler = memo(LifeCycleHandlerNoMemo);
