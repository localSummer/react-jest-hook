import React, {createContext, useEffect} from 'react';
import {useLocalStore} from 'mobx-react';

export const MyContext = createContext(null);

export const Counter = (props) => {
  const store = useLocalStore(() => (
    {
      count: 1,
      get getCount() {
        return store.count;
      },
      handleCount() {
        store.count += 2;
      }
    }
  ));

  useEffect(() => {
    console.log(333);
  }, [store]);

  return (
    <MyContext.Provider value={store}>
      {props.children}
    </MyContext.Provider>
  )
};

