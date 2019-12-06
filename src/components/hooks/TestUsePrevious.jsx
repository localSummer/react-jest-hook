import React, {useState, useRef, useEffect} from 'react';

function Counter() {
  const [count, setCount] = useState(0);

  const prevCountRef = useRef();

  // useEffect 为 componentDidMount，componentDidUpdate 和 componentWillUnmount 这三个函数的组合。
  useEffect(() => {
    console.log(111); // 后执行
    prevCountRef.current = count;
  });
  console.log(222); // 先执行
  const prevCount = prevCountRef.current;

  return (
    <h1>
      Now: {count}, before: {prevCount}
      <button onClick={() => setCount(count + 1)}>add</button>
  </h1>
  );
}

export default Counter;