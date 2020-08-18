import "@testing-library/jest-dom";

import React, {FC} from "react";
import {Subject} from "rxjs";
import {render, screen, act} from "@testing-library/react";

import {useObservable} from ".";

test("should render", () => {
  const obs$ = new Subject<number>();

  const TestComponent: FC = () => {
    const [val] = useObservable(obs$, 42);
    return <span data-testid="val">{val}</span>;
  };

  render(<TestComponent />);

  expect(screen.queryByTestId("val")).toHaveTextContent("42");
});

test("should update on next", async () => {
  const obs$ = new Subject<number>();

  const TestComponent: FC = () => {
    const [val] = useObservable(obs$, 42);
    return <span data-testid="val">{val}</span>;
  };

  render(<TestComponent />);
  expect(screen.queryByTestId("val")).toHaveTextContent("42");

  act(() => obs$.next(43));
  expect(screen.queryByTestId("val")).toHaveTextContent("43");
});

test("should trigger callback on next", async () => {
  const callback = jest.fn();
  const obs$ = new Subject<number>();

  const TestComponent: FC = () => {
    const [val] = useObservable(obs$, 42, callback);
    return <span data-testid="val">{val}</span>;
  };

  render(<TestComponent />);
  expect(callback).not.toHaveBeenCalled();

  act(() => obs$.next(43));
  expect(callback).toHaveBeenCalledTimes(1);
  expect(callback).toHaveBeenCalledWith(43);
});
