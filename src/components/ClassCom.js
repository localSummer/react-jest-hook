import React, { Component } from 'react';
import {inject, observer} from 'mobx-react';

@inject('store')
@observer
class ClassCom extends Component {
  componentDidMount() {
    console.log(this.props);
  }

  handleClick = () => {
    this.props.store.handleCount();
  };

  render() {
    return (
      <div>
        count: {this.props.store.count}
        <button onClick={this.handleClick}>add one</button>
      </div>
    )
  }
}

export default ClassCom;
