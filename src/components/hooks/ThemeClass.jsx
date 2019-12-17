import React from 'react';
import { useStores } from '../../hooks/user-store';
import { observer } from 'mobx-react-lite';

const ThemeClass = observer(() => {
  let store = useStores();

  const handleIncrement = () => {
    store.counterStore.increment();
  }
  const handleDecrement = () => {
    store.counterStore.decrement();
  }
  const {counterStore, themeStore} = store;
  return (
    <div>
      <p>mobx-react Provider</p>
      count: {counterStore.count}
      theme: {themeStore.theme}
      <button onClick={handleIncrement}>add</button>
      <button onClick={handleDecrement}>dec</button>
    </div>
  )
})

export default ThemeClass;