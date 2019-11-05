import React from 'react';
import { useStores } from '../../hooks/user-store';
import { observer } from 'mobx-react';

export const Counter = observer(() => {
  const { counterStore } = useStores()

  return (
    <>
      <div>{counterStore.count}</div>
      <button onClick={() => counterStore.increment()}>++</button>
      <button onClick={() => counterStore.decrement()}>--</button>
    </>
  )
})