import React from 'react';
import {shallow, configure} from 'enzyme';
import CheckboxWithLabel from './CheckboxWithLabel';
import Adapter from 'enzyme-adapter-react-16';
configure({ adapter: new Adapter() });

test('CheckboxWithLabel changes the text after click', () => {
  const checkbox = shallow(<CheckboxWithLabel labelOn="On" labelOff="Off" />);
  expect(checkbox.text()).toEqual('Off');
  expect(checkbox.text()).toMatchSnapshot();

  checkbox.find('input').simulate('change');

  expect(checkbox.text()).toEqual('On');
  expect(checkbox.text()).toMatchSnapshot();
})


