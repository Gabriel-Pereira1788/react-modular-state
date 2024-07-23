export type Action<Type, Payload> = { type: Type; payload?: Payload };
export type Reducer<State, Action> = (state: State, action: Action) => State;
