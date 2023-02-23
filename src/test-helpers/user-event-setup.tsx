import React from "react";
import userEvent from "@testing-library/user-event";
import { render } from "@testing-library/react";
import { BrowserRouter, MemoryRouter, Router } from "react-router-dom";
import { MemoryHistory } from "history";

type WrapperProps = {
  children: React.ReactNode;
};

export function setup(jsx: JSX.Element) {
  return {
    user: userEvent.setup(),
    ...render(jsx),
  };
}
//{ skipHover: true } add to setup to fix pointer-events bug

export function renderWithRouter(ui: JSX.Element, { route = "/" } = {}) {
  window.history.pushState({}, "Test page", route);

  return {
    user: userEvent.setup(),
    ...render(ui, { wrapper: BrowserRouter }),
  };
}

const createRouterWrapper = (
  history: MemoryHistory,
): React.ComponentType<WrapperProps> => {
  return ({ children }) => (
    <Router navigator={history} location={history.location}>
      {children}
    </Router>
  );
};

export function renderWithRouterAndHistory(
  jsx: JSX.Element,
  history: MemoryHistory,
) {
  return {
    user: userEvent.setup(),
    ...render(jsx, { wrapper: createRouterWrapper(history) }),
  };
}

// function memoryRouterWrapper({ children }: { children: JSX.Element }) {
//   return <MemoryRouter>{children}</MemoryRouter>;
// }

const createMemoryRouterWrapper = (
  initialEntries: string[],
): React.ComponentType<WrapperProps> => {
  return ({ children }) => (
    <MemoryRouter initialEntries={initialEntries}>{children}</MemoryRouter>
  );
};

export function renderWithMemoryRouter(
  jsx: JSX.Element,
  initialEntries: string[],
) {
  return {
    user: userEvent.setup(),
    ...render(jsx, { wrapper: createMemoryRouterWrapper(initialEntries) }),
  };
}
