# 👀 React use observable [![npm](https://img.shields.io/npm/v/@soywod/react-use-observable?label=npm)](https://www.npmjs.com/package/@soywod/react-use-observable) [![gh-actions](https://github.com/soywod/react-use-observable/workflows/tests/badge.svg)](https://github.com/soywod/react-use-observable/actions?query=workflow%3Atests)

React hook that consumes any kind of observable via `useState`.

## Installation

```bash
npm install @soywod/react-use-observable
# or
yarn add @soywod/react-use-observable
```

## Definition

```typescript
declare type UseObservable = <T>(obs$: Observable<T>, defaultVal: T, fn?: UseObservableFn<T>) => [T, UseObservableFn<T>];
declare type UseObservableFn<T> = (val: T) => void;

declare const useObservable: UseObservable;
```

## Usage

The observable can be any kind of object with a `subscribe` and a `next`
property. For eg with [RxJS](https://github.com/ReactiveX/rxjs#readme):

`counter/service.ts`:

```typescript
import {BehaviorSubject} from "rxjs";

export const counter$ = new BehaviorSubject(0);
export function incrementCounter() {
  counter$.next(count => count + 1);
}
```

`counter/component.tsx`:

```typescript
import React from "react"
import {useObservable} from "@soywod/react-use-observable";

import {counter$, incrementCounter} from "./service"

const MyComponent: FC = () => {
  const [count] = useObservable(counter$, counter$.value);
  return <button onClick={incrementCounter}>{count}</button>;
}
```

## Development

```bash
git clone https://github.com/soywod/react-use-observable.git
cd react-use-observable
yarn install
```

## Tests

```bash
yarn test
```
