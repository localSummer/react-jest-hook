import React from 'react';
import PropTypes from 'prop-types';

const Foo = (props) => {
  return (
    <div msg={props.msg}>
      Foo Component {props.msg}
      <button onClick={props.onButtonClick}>Click</button>
      <input className="inner" data-selector="test-input" type="text" value={props.msg} />
    </div>
  );
};

Foo.propTypes = {
  msg: PropTypes.string.isRequired
}

export default Foo;