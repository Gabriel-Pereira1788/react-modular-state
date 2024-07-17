import React from "react";

import { create, LifeCycleHandler } from "../react";

type Action = { type: "CHANGE_TWO"; payload: number };
const [countModuleStore, useCountModuleState, useCountModuleDispatch] = create(
  {
    count1: 1,
    count2: 2,
  },
  (state, action: Action) => {
    if (action.type === "CHANGE_TWO") {
      return {
        ...state,
        count1: state.count1 + 4,
        count2: state.count2 + 3,
      };
    }

    return state;
  }
);

const Component1: React.FC = () => {
  const [count1, setCount1] = useCountModuleState("count1");
  console.log("RENDER-COMPONENT1");
  return (
    <div>
      {count1}
      <button onClick={() => setCount1(count1 + 1)}>more 1</button>
    </div>
  );
};

const Component2: React.FC = () => {
  console.log("RENDER-COMPONENT2");
  const [count2, setCount2] = useCountModuleState("count2");
  return (
    <div>
      {count2}
      <button onClick={() => setCount2(count2 + 2)}>more 2</button>
    </div>
  );
};

const ButtonChangeTwo: React.FC = () => {
  const dispatch = useCountModuleDispatch();
  console.log("BUTTON-CHANGE-RENDER");
  return (
    <div>
      <button
        onClick={() => {
          dispatch({ type: "CHANGE_TWO", payload: 4 });
        }}
      >
        Change two
      </button>
    </div>
  );
};
export const CountModule: React.FC = () => {
  return (
    <div style={{ flex: 1 }}>
      <LifeCycleHandler store={countModuleStore}>
        <Component1 />
        <Component2 />
        <ButtonChangeTwo />
      </LifeCycleHandler>
    </div>
  );
};
