import React from 'react'

class SetName extends React.Component {
  constructor(props) {
    super(props);
    this.state = { name: 'foo' };
  }

  render() {
    const { name } = this.state;
    return (
      <div className={name} />
    );
  }
}

export default SetName