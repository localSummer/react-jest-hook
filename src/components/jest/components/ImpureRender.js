import React from 'react';

class ImpureRender extends React.Component {
  constructor(props) {
    super(props);
    this.count = 0;
  }

  render() {
    this.count += 1;
    return (
      <div>{this.count}</div>
    );
  }
}

export default ImpureRender;