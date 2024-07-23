# Introduction 

Welcome to react-modular-state, a powerful and flexible state management library for React. This library is designed to help developers manage state in a more modular and efficient way, focusing on providing shared states across component trees without causing unnecessary re-renders. With react-modular-state, you can easily create, manage, and unmount states as soon as components are unmounted, keeping your application performance optimized.

**Key Features** :

- 📦 Modular State Management: Share states across component trees seamlessly.
- ⚡ Optimized Performance: Prevent unnecessary re-renders and ensure efficient state management.
- 🧹 Automatic Cleanup: Automatically unmount and clean up state when components are unmounted.
- 🔄 Reducer Support: Organize state transitions using reducers for more complex state logic. 

Whether you are building a small application or a large-scale project, react-modular-state provides the tools you need to keep your state management clean, modular, and efficient. Dive in and start leveraging the power of modular state management in your React applications today!

## 📦 Installing

```
yarn add react-modular-state
```
or

```
npm install react-modular-state
```

### 🚀 How to use
The main focus of this library is to provide states that need to be shared across a component tree, ensuring that these states communicate with each other without causing unnecessary re-renders and dismantling the state as soon as the component is unmounted.

### 🛠 Creating store
Create a separate file to index the store and use the create method to create the store and its manipulation hooks:

```ts
import { create } from 'react-modular-state';
interface Item {
  name: string;
  price: number;
}
type ShoppingCartState = {
  items: Item[];
  total: number;
  isLoading: boolean;
};

const initialState: ShoppingCartState = {
  items: [],
  total: 0,
  isLoading: false,
};

export const [shoppingCartStore, useShoppingCartState] = create(initialState);

```

### 🔄 Using LifeCycleHandler

The LifeCycleHandler component is not a state provider, but rather an implementation responsible for unmounting the state and clearing its values when the component is unmounted.

```ts
import {LifeCycleHandler} from 'react-modular-state'

const ShoppingCart: React.FC = () => {
  return (
    <LifeCycleHandler store={shoppingCartStore}>
      <div>
        <h2>Shopping Cart</h2>
        <ShoppingCartList />
        <ShoppingCartTotal />
        <ShoppingCartAdd />
        <ShoppingCartDiscount />
      </div>
    </LifeCycleHandler>
  );
};

```

If the component is not used, its state will remain active in memory, potentially being accessed as a global state.

### 🪝 Using the hook
```ts
export function ShoppingCartList() {
  const [items, setItems] = useShoppingCartState("items");

  function removeFromCart(indexToRemove: number) {
    const newItems = items.filter((_, i) => i !== indexToRemove);
    setItems(newItems);
  }

  return (
    <ul>
      {items.map((item, index) => (
        <li key={index}>
          {item.name} - ${item.price}
          <button onClick={() => removeFromCart(index)}>Remove</button>
        </li>
      ))}
    </ul>
  );
}
```

Unlike the presented implementation, the hook for using the state employs a syntax similar to the standard React useState. The primary difference is that the state is selected via its key, as shown in the example above where the key is "items".

The hook returns the state at the first index and its modification function at the second, making the syntax more user-friendly.

### ➕ Optional: Adding a reducer

You can also use a reducer to organize state transitions.

```ts
type Action =
  | { type: "ADD_TO_CART"; item: Item }
  | { type: "REMOVE_FROM_CART"; index: number }

const initialState: ShoppingCartState = {
  items: [],
  total: 0,
  isLoading: false,
};

function reducer(
  prevState: ShoppingCartState,
  action: Action
): ShoppingCartState {
  if (action.type === "ADD_TO_CART") {
    return {
      ...prevState,
      items: [...prevState.items, action.item],
      total: prevState.total + action.item.price,
    };
  }

  if (action.type === "REMOVE_FROM_CART") {
    const newItems = prevState.items.filter((_, i) => i !== action.index);
    return {
      ...prevState,
      items: newItems,
    };
  }

  return prevState
}
  export const [
  shoppingCartStore,
  useShoppingCartState,
  useShoppingCartDispatch,
] = create(initialState, reducer);
```

