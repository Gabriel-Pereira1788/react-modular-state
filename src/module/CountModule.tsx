import React from "react";
import { create } from "../react";

const [CountModuleProvider, useCountModuleState] = create({
  count1: 1,
  count2: 2,
});

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
export const CountModule: React.FC = () => {
  return (
    <div style={{ flex: 1 }}>
      <CountModuleProvider>
        <Component1 />
        <Component2 />
      </CountModuleProvider>
    </div>
  );
};
