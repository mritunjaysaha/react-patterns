# React Patterns

## Design Patterns

#### Compound Pattern

[Reference](https://www.patterns.dev/react/compound-pattern)

-   **Pros and Cons**
    -   **Pros**
        -   Compound components manage their own internal state.
        -   The internal state is shared among several child components.
        -   When importing a compound component, we don't have to explicitly import the child components that are available on that component.
    -   **Cons**
        -   When using the **React.children.map** to provide the values, the component nesting is limited. Only direct children of the parent component will have access to the **open** and **toggle** props, meaning we can't wrap any of these components in another component.
        -   Cloning an element with **React.cloneElement** performs a shallow merge. Already existing props will be merged together with the new props has the same name as the props we're passing to the **React.cloneElement** method.
        -   As the props are shallowly merged, the value of that prop will be overwritten with the latest value that we pass.

```jsx
// cons of using compound pattern
export default function FlyoutMenu() {
    return (
        <FlyOut>
            {/* This breaks */}
            <div>
                <FlyOut.Toggle />
                <FlyOut.List>
                    <FlyOut.Item>Edit</FlyOut.Item>
                    <FlyOut.Item>Delete</FlyOut.Item>
                </FlyOut.List>
            </div>
        </FlyOut>
    );
}
```

#### HOC Pattern

[Reference](https://www.patterns.dev/react/hoc-pattern)

-   Using same logic in multiple components.
    -   This logic can include applying a certain styling to components, requiring authorization, or adding a global state.
-   A HOC is a component that receives another component.
    -   HOC contains certain logic that we want to apply to the component that we pass as a parameter. After applying that logic, the HOC returns the element with the additional logic.
    -   Add a certain styling to multiple components in our application. Instead of creating a **style** object locally each time, we can simply create a HOC that adds the **style** objects to the component that we pass to it.
-   In some cases, we can replace the HOC pattern with React Hooks.
-   Generally, ReactHooks don't replace the HOC pattern
    _"In most cases, Hooks will be sufficient and help reduce nesting in your tree"_ -- [React docs](https://legacy.reactjs.org/docs/hooks-faq.html#do-hooks-replace-render-props-and-higher-order-components)

##### Best use-cases for a HOC:

-   The same, uncustomized behavior needs to be used by many components throughout the application.
-   The component can work standalone, without the added custom logic.

##### Best use-cases for Hooks:

-   The behavior has to be customized for each component that uses it.
-   The behavior is not spread throughout the application, only one or a few components use the behavior.
-   The behavior adds many properties to the component.

##### Pros and Cons

-   **Pros**

    -   Using the HOC pattern allows us to keep logic that we want to re-use all in one place. This reduces the risk of accidentally spreading bugs throughout the application by duplicating code over and over, potentially introducing new bugs each time. By keeping the logic all in one place, we can keep our code **DRY** and easily enforce separation of concerns.

-   **Cons**
    -   The name of the prop that a HOC can pass to an element, can cause a naming collision.

#### Hooks Pattern

[Reference](https://www.patterns.dev/react/hooks-pattern)

-   Hooks make it possible to use React state and lifecycle methods, without having to use class components.
-   Hooks are not necessarily a design pattern.
-   Hooks play a very important role in your application design.
-   Many traditional design patterns can be replaced by Hooks.

##### **Down sides of using class components**

-   The common way to share code among several components, is by using the **Higher Order Component** or **Render Props pattern**. Although _both patterns are valid and a good practice_, adding those patterns at a **later point in time** requires you to **restructure your application**.

```jsx
<WrapperOne>
    <WrapperTwo>
        <WrapperThree>
            <WrapperFour>
                <WrapperFive>
                    <Component>
                        <h1>Finally in the component!</h1>
                    </Component>
                </WrapperFive>
            </WrapperFour>
        </WrapperThree>
    </WrapperTwo>
</WrapperOne>
```

-   The **wrapper hell** can make it difficult to understand how data is flowing through your application, which can make it harder to figure out why unexpected behavior is happening.

##### Why to use Hooks

-   Class components aren’t always a great feature in React.
-   To solve the common issues that React developers can run into when using class components, React introduced React Hooks.
-   React Hooks are functions that you can use to manage a components state and lifecycle methods.
    -   React hooks made it possible to:
        -   add state to a functional component.
        -   manage a component's lifecycle without having to use lifecycle methods such as **componentDidMount** and **componentWillUnmount**.
        -   reuse the same stateful logic among multiple components throughout the app.

##### Types of Hooks

-   State hook

    -   React provides a hook that manages state within a functional component, called **useState**.
    -   In order to use the **useState** hook, we need to access the **useState** method that React provides for us. The **useState** method expects an argument: this is the initial value of the state, an empty string in this case.
    -   We can destructure two values from the **useState** method

        -   The **current value** of the state
        -   The **method with which we can update** the state

        ```jsx
        const [value, setValue] = React.useState(initialValue);
        ```

-   Effect hook

    -   with the **useEffect** hook, we can _"hook into"_ a components lifecycle. The **useEffect** hook effectively combines the **componentDidMount**, **componentDidUpdate**, and **componentWillUnmount** lifecycle methods.

    ```jsx
    componentDidMount(){... }
    useEffect(()=> {...}, [])

    componentWillUnmount(){...}
    useEffect(()=> {return ()=> {...}}, [])

    componentDidUpdate(){...}
    useEffect(()=>{...})
    ```

-   Custom hook
    -   Besides the built-in hooks that React provides (**useState**, **useEffect**, **useReducer**, **useRef**, **useContext**, **useMemo**, **useImperativeHandle**. **useLayoutEffect**, **useDebugValue**, **useCallback**).
    -   It's important to start your hooks with **use** in order for React to check if it violates the **rules of Hooks**.
        -   Only call hooks at the **Top Level**.
        -   Only call hooks from **React Functions**.
            -   Call hooks from React function components.
            -   Call hooks from custom hooks

##### Pros and Cons of Hooks Patterns

-   **Pros**
    -   **Fewer lines of code**
        -   Hooks allows us to group code by concern and functionality, and not by lifecycle. This makes the code not only cleaner and concise but also shorter.
    -   **Simplifies complex components**
        -   JS classes can be difficult to manage, hard to use with hot reloading and may not minify as well. React Hooks solves these problems and ensures functional programming is made easy. With the implementation of Hooks, We don't need to have class components.
    -   **Reusing stateful logic**
        -   Class in js encourage multiple levels of inheritance that quickly increase overall complexity and potential for errors. Howeverm Hooks allow you to use state, and other React features without writing a class. With react, you can always reuse stateful logic without the need to rewrite the code over and over again. This reduces the chances of errors and allows for composition with plain functions.
    -   **Sharing non-visual logic**
        -   Until the implementation of Hooks, React had no way of extracting and sharing non-visual logic. This eventually led to more complexities, such as HOC patterns and Render props, just to solve a common problem. But, the introduction of Hooks has solved this problem because it allows for the extraction of stateful logic to a simple JavaScript function.
-   **Cons**
    -   Have to respect its rules, without a linter plugin, it is difficult to know which rule has been broken.
    -   Need a considerable time practicing to use properly (Exp: useEffect).
    -   Be aware of the wrong use (Exp: useCallback, useMemo).

### Container / Presentational Pattern

-   One way to enforce separation of concerns.

#### Presentational component

-   Receives data through **props**. Its primary function is to simply **display the data it receives** the way we want them to, including styles, without **modifying** that data.
-   Receives their data from **container components**.

#### Container components

-   Primary function of container components is to **pass data** to presentational components, which they contain.
-   Container components themselves usually don't render any other components besides the presentational components that care about their data.
-   Since they do not render anything themselves, they usually do not contain any styling either.

**In many cases, the Container/Presentational pattern can be replaced with React Hooks.**

The introduction of Hooks made it easy for developers to add statefulness without needing a container component to provide that state.

Instead of having the data fetching logic logic in the **Container** component, we can create a custom hook that fetches the images, and returns the array of dogs.

By using hook, we no longer need the wrapping **Container** component to fetch the data, and send this to the **Presentational** component. Instead we can use this hook directly in presentational component.

#### Pros and Cons of Container / Presentational component.

**Pros**

-   Encourages separation of concerns.
-   Presentational components can be pure functions which are responsible for the UI, whereas container components are responsible for the state and data of the application. This makes it easy to enforce the separation of concerns.
-   Presentational components are easily made reusable, as they display data without altering this data. We can reuse the presentational components throughout our application for different purposes.
-   If presentational component is reused in many parts of the application, the change can ne consistent throughout the app.
-   Testing presentational components is easy, as they are usually pure functions.

**Cons**

-   Hooks made it possible to achieve the same result without having to use the **Container/Presentational pattern**, ans without having to rewrite a stateless functional component into a class component.
-   Can easily be an overkill in smaller sized application.

#### Render props pattern

-   A render props is a props on a component, which value is a function that returns a JSX element. The component itself does not render anything besides the render prop. Instead, the component simply calls the render props, instead of implementing its own rendering logic.
-   In some cases, we can replace render props with hooks.

**Pros**

-   Sharing logic and data among several components is easy with the render props pattern.
-   Components can be made very reusable, by using a render or **children** prop. Although the HOC pattern mainly solves the same issues, namely **reusability** and **sharing data**, the render props pattern solves some of the issues we could encounter by using the HOC pattern.
-   The issue of **naming collisions** that we can run into using the HOC pattern no longer applies by using the render props pattern, since we don't automatically merge props. We explicitly pass the props down to the child components, with the value provided by the parent component.
-   Since we explicitly pass props, we solve the HOC's implicit props issue. The props that should get passed down to the element, are all visible in the render prop's arguments list.
-   We can separate our app's logic from rendering components through render props. The stateful component that receives a render prop can pass the data onto stateless components, which merely render the data.

**Cons**

-   The issues that we tried to solve with render props, have largely been replaced by React Hooks. As hooks changed the way we can add reusability and data sharing to components, they can replace the render props pattern in many cases.
-   We can't add lifecycle methods to a **render** prop, we can only use it on components that don't need to alter the data they receive.

# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

-   [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
-   [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

-   Configure the top-level `parserOptions` property like this:

```js
export default {
    // other rules...
    parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module",
        project: ["./tsconfig.json", "./tsconfig.node.json"],
        tsconfigRootDir: __dirname,
    },
};
```

-   Replace `plugin:@typescript-eslint/recommended` to `plugin:@typescript-eslint/recommended-type-checked` or `plugin:@typescript-eslint/strict-type-checked`
-   Optionally add `plugin:@typescript-eslint/stylistic-type-checked`
-   Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and add `plugin:react/recommended` & `plugin:react/jsx-runtime` to the `extends` list
