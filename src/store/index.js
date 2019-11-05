import {observable, action} from 'mobx';
export * from './counter-store';
export * from './theme-store';

class Store {
  @observable
  count = 0;

  @action
  handleCount() {
    this.count += 1;
  }
}

export default new Store();
