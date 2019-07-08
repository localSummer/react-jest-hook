import {observable, action} from 'mobx';

class Store {
  @observable
  count = 0;

  @action
  handleCount() {
    this.count += 1;
  }
}

export default new Store();
