import React from 'react'
import PropTypes from 'prop-types'

class UnMount extends React.Component {
  constructor(props) {
    super(props);
    this.componentWillUnmount = props.fn;
  }

  render() {
    const { id } = this.props;
    return (
      <div className={id}>
        {id}
      </div>
    );
  }
}
UnMount.propTypes = {
  id: PropTypes.string.isRequired,
};

export default UnMount