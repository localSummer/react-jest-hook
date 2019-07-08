import React, { useState } from 'react'

export default function HookDemo01() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>you clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>Add</button>
      <button onClick={() => setCount(count - 1)}>decrease</button>
    </div>
  );
}
