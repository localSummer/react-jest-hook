import React from 'react';
import { inject, observer } from 'mobx-react'; 

@inject('store')
@observer
class ThemeClass extends React.Component {
  render() {
    return (
      <div>
        themeClass
      </div>
    )
  }
}

export default ThemeClass;