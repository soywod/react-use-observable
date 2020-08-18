import {useEffect, useState} from "react";

import {Observable, UseObservableFn, UseObservable} from "./hook.types";

export const useObservable: UseObservable = <T>(
  obs$: Observable<T>,
  defaultVal: T,
  fn?: UseObservableFn<T>,
) => {
  const [val, setVal] = useState(defaultVal);

  useEffect(() => {
    const sub = obs$.subscribe(val => {
      if (typeof fn === "function") {
        fn(val);
      }

      setVal(val);
    });

    return () => {
      sub.unsubscribe();
    };
  }, []);

  return [val, (val: T) => obs$.next(val)];
};

export default useObservable;
