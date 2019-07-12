import React from 'react'
import {shallow} from 'enzyme'
import UseFoo from './UseFoo'
import Foo from './Foo'

describe('<UseFoo />', () => {
  test('renders three <Foo /> components', () => {
    const wrapper = shallow(<UseFoo />)

    expect(wrapper).toMatchSnapshot();

    // expect(wrapper.find('Foo').length).toBe(3)
    expect(wrapper.find('Foo')).toHaveLength(3)
  });
});



