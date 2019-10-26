import React, { Component } from 'react'
import './index.less';

class NavList extends Component {
  render() {
    return (
      <ul>
        {
          React.Children.map(this.props.children, (element, index) => {
            return React.cloneElement(element, {
              selectKey: this.props.selectKey,
              secondKey: this.props.secondKey || '',
              key: index
            });
          })
        }
      </ul>
    )
  }
}

export default NavList;