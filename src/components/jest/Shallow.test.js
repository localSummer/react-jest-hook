/* eslint-disable react/react-in-jsx-scope */
import React from 'react';
import {shallow} from 'enzyme';
import ImpureRender from './components/ImpureRender';

describe('Shallow API Test', () => {
  it('test update api', () => {
    const wrapper = shallow(<ImpureRender />);

    expect(wrapper.text()).toBe("1")
    wrapper.update() // update无效
    // expect(wrapper.text()).toBe('2') Received '1'
  })

  it('test forEach api', () => {
    const wrapper = shallow(
      <div>
        <div className="foo bax" />
        <div className="foo bar" />
        <div className="foo baz" />
      </div>
    )

    wrapper.find('.foo').forEach(node => {
      expect(node.hasClass('foo')).toBe(true)
    })
  })

  it('test slice api', () => {
    const wrapper = shallow(
      <div>
        <div className="foo bax" />
        <div className="foo bar" />
        <div className="foo baz" />
      </div>
    )

    expect(wrapper.find('.foo').slice(1)).toHaveLength(2)

    expect(wrapper.find('.foo').slice(1).at(0).hasClass('bar')).toBeTruthy()

    expect(wrapper.find('.foo').slice(1).at(1).hasClass('baz')).toBe(true)
  })

  it('test mockFn calls', () => {
    const mockFn = jest.fn(() => 10)

    mockFn(1, 2)
    mockFn('3', '4')
    // console.log(mockFn.mock);
    expect(mockFn.mock.calls).toHaveLength(2)
    mockFn.mock.results.forEach(item => {
      expect(item.value).toBe(10)
    })
    mockFn.mockClear()
    // console.log(mockFn.mock);
  })

  it('test mockImplementationOnce api', () => {
    const myMockFn = jest.fn().mockImplementationOnce(cb => cb(null, true)).mockImplementationOnce(cb => cb(null, false))

    myMockFn((err, val) => console.log(val))
    myMockFn((err, val) => console.log(val))
  })

  it('test mockImplementation api', () => {
    jest.mock('./components/someClass.js')
    const SomeClass = require('./components/someClass')

    const mockFn = jest.fn()

    SomeClass.mockImplementation(() => {
      return {
        m: mockFn
      }
    })

    const some = new SomeClass()
    some.m('a', 'b')
    // console.log(mockFn.mock.calls);
  })

  it('test mockName', () => {
    const mockFn = jest.fn().mockName('mockedFunction')
    mockFn()
    expect(mockFn).toHaveBeenCalledTimes(1)
  })

  it('test mockResolvedValue api', async () => {
      const mockFn = jest.fn().mockResolvedValue(43)
      let value = await mockFn()
      console.log('value: ', value);
  })
});
