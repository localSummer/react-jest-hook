import React, {useContext} from 'react';
import {Observer} from 'mobx-react-lite';
import {MyContext} from '../../store/HookStore';

const Demo2 = () => {
  const store = useContext(MyContext);
  return (
    <div>
      <p>counter3: {store.getCount}</p>
      <Observer>{() => <p>counter3: {store.getCount}</p>}</Observer>
      <button onClick={() => store.handleCount()}>set counter3</button>
      <hr/>
    </div>
  )
}

export default Demo2;
