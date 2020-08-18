export type Subscription = {
  unsubscribe: () => void;
};

export type Observable<T> = {
  subscribe: (fn: UseObservableFn<T>) => Subscription;
  next: UseObservableFn<T>;
};

export type UseObservable = <T>(
  obs$: Observable<T>,
  defaultVal: T,
  fn?: UseObservableFn<T>,
) => [T, UseObservableFn<T>];

export type UseObservableFn<T> = (val: T) => void;
