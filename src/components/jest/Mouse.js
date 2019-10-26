import React from 'react'
import PropTypes from 'prop-types'

class Mouse extends React.Component {
  constructor() {
    super();
    this.state = { x: 0, y: 0 };
  }

  render() {
    const { render } = this.props;
    return (
      <div
        style={{ height: '100%' }}
        onMouseMove={(event) => {
          this.setState({
            x: event.clientX,
            y: event.clientY,
          });
        }}
      >
        {render(this.state)}
      </div>
    );
  }
}

Mouse.propTypes = {
  render: PropTypes.func.isRequired,
};

export default Mouse