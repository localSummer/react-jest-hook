import React, {useState, useEffect, useContext} from 'react'
import {Observer, observer} from 'mobx-react-lite';
import {MyContext} from '../../store/HookStore';
import HookDemo2 from './Demo02';

const HookDemo01 = observer(() => {
  const [num, setNum] = useState(10);
  const store = useContext(MyContext);

  useEffect(() => {
    console.log('num change', MyContext);
  }, [num]);

  return (
    <div>
      <p>num: {num}</p>
      <button onClick={() => setNum(num + 1)}>set num</button>
      <p>counter2: {store.getCount}</p>
      <Observer>{() => <p>counter2: {store.getCount}</p>}</Observer>
      <button onClick={() => store.handleCount()}>set counter2</button>
      <hr/>
      <HookDemo2></HookDemo2>
    </div>
  );
})

export default HookDemo01;
