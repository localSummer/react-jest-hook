import React from 'react'
import Mouse from './Mouse'

const UseMouse = () => {
  return (
    <div style={{ height: '100%' }}>
      <Mouse
        render={(x = 0, y = 0) => (
          <h1>
            The mouse position is ({x}, {y})
          </h1>
        )}
      />
    </div>
  )
}

export default UseMouse