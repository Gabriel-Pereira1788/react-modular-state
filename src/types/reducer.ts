export type Action<Type, Payload> = { type: Type; payload: Payload };
export type Reducer<State, Payload, Type> = (
  state: State,
  action: Action<Type, Payload>
) => State;
