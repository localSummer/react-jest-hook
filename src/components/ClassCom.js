import React, { Component } from 'react';
import {inject, observer} from 'mobx-react';
import {Observer} from 'mobx-react-lite';
import {MyContext} from '../store/HookStore';
import {toJS} from 'mobx';

@inject('store')
@observer
class ClassCom extends Component {
  componentDidMount() {
    // console.log(this.props);
  }

  handleClick = () => {
    this.props.store.handleCount();
  };

  render() {
    return (
      <div>
        count: {this.props.store.count}
        <button onClick={this.handleClick}>add one</button>
        <MyContext.Consumer>
          {
            store => {
              console.log('store: ', toJS(store));
              return (
                <>
                  <p>counter1: {store.count}</p>
                  <Observer>{() => <p>counter1: {store.count}</p>}</Observer>
                  <button onClick={() => store.handleCount()}>set counter1</button>
                </>
              )
            }
          }
        </MyContext.Consumer>
      </div>
    )
  }
}

export default ClassCom;
