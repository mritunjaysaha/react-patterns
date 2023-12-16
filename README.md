# React Patterns

### Design Patterns

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

### Pros and Cons

-   **Pros**

    -   Using the HOC pattern allows us to keep logic that we want to re-use all in one place. This reduces the risk of accidentally spreading bugs throughout the application by duplicating code over and over, potentially introducing new bugs each time. By keeping the logic all in one place, we can keep our code **DRY** and easily enforce separation of concerns.

-   **Cons**
    -   The name of the prop that a HOC can pass to an element, can cause a naming collision.

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
