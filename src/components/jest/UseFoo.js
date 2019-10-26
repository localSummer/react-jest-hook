import React from 'react'
import Foo from './Foo'

const UseFoo = (props) => {
  return (
    <div className="foo">
      <span className="foo icon-star bar">icon-star</span>
      <Foo msg="1" />
      <Foo msg="2" />
      <Foo msg="3" />
      {
        props.children
      }
    </div>
  )
}

export default UseFoo