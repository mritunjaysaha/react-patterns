# React Patterns

### Design Patterns

-   Compound Pattern
    -   [Reference](https://www.patterns.dev/react/compound-pattern)
    -   **Pros and Cons**
        -   **Pros**
            -   Compound components manage their own internal state.
            -   The internal state is shared among several child components.
            -   When importing a compound component, we don't have to explicitly import the child components that are available on that component.
        -   **Cons**
            -   When using the **React.children.map** to provide the values, the component nesting is limited. Only direct children of the parent component will have access to the **open** and **toggle** props, meaning we can't wrap any of these components in another component.
            -   Cloning an element with **React.cloneElement** performs a shallow merge. Already existing props will be merged together with the new props has the same name as the props we're passing to the **React.cloneElement** method.
            -   As the props are shallowly merged, the value of that prop will be overwritten with the latest value that we pass.

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
