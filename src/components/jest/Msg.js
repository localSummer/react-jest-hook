import React from 'react'

class Msg extends React.Component {
  componentDidMount() {}

  componentWillReceiveProps() {}
  
  render() {
    return (
      <div>{this.props.msg}</div>
    )
  }
}

export default Msg;