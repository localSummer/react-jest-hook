import React from 'react'
import {shallow} from 'enzyme'
import UseFoo from './UseFoo'
import Foo from './Foo'
import Msg from './Msg'
import UseMouse from './UseMouse'
import UnMount from './UnMount'
import SetName from './SetName'

describe('<UseFoo />', () => {
  it('renders three <Foo /> components', () => {
    const wrapper = shallow(<UseFoo />)

    expect(wrapper).toMatchSnapshot();

    // expect(wrapper.find('Foo').length).toBe(3)
    expect(wrapper.find('Foo')).toHaveLength(3)
  });

  it('renders an `.icon-star`', () => {
    const wrapper = shallow(<UseFoo/>);

    expect(wrapper.find('.icon-star')).toHaveLength(1);
  })

  it('renders children when passed in', () => {
    const wrapper = shallow(
      <UseFoo>
        <div className="unique">unique children</div>
      </UseFoo>
    )

    expect.assertions(1)

    expect(wrapper.contains(<div className="unique">unique children</div>)).toBeTruthy()
  })

  it('simulates click events', () => {
    const onButtonClick = jest.fn()

    const wrapper = shallow(
      <Foo msg="simulate click" onButtonClick={onButtonClick} />
    )

    // prop 只针对root根节点上同名属性，对于函数组件，调用instance方法返回 null
    expect(wrapper.prop('msg')).toBe('simulate click')

    wrapper.find('button').simulate('click')

    expect(onButtonClick).toHaveBeenCalledTimes(1)

    expect(wrapper.find('[data-selector="test-input"]')).toHaveLength(1)

  })

  it('test findWhere', () => {
    const wrapper = shallow(
      <UseFoo>
        <span>111</span>
      </UseFoo>
    )

    let complexComponents = wrapper.findWhere(node => {
      // console.log('node: ', node.type(), '-----');
      // return node.type() === 'Foo Component' // 函数组件没有实例，返回字符串组件render tree, 函数组件推荐使用snapshot测试
      return node.type() === 'div'
    })
    expect(complexComponents.length).toBe(1)
  })

  it('test filter', () => {
    const wrapper = shallow(
      <UseFoo>
        111
      </UseFoo>
    )

    expect(wrapper.find('.foo').filter('.bar').length).toBe(1)
  })

  it('test hostNodes', () => {
    const wrapper = shallow(
      <div>
        <UseFoo className="foo">
          11
        </UseFoo>
        <span className="foo">22</span>
        <div className="foo">333</div>
      </div>
    )

    const twoNodes = wrapper.find('.foo')

    // hostNodes 只保留html节点，过滤掉React组件
    expect(twoNodes.hostNodes().length).toBe(2)
  })

  it('test contains', () => {
    const wrapper = shallow(
      <div>
        <div data-foo="foo" data-bar="bar">Hello</div>
        <span>Hello</span>
      </div>
    )

    expect(wrapper.contains(<div data-foo="foo" data-bar="bar">Hello</div>)).toBe(true)
    
    expect(wrapper.contains(<div data-foo="foo">Hello</div>)).toBe(false)

    expect(wrapper.contains(<div data-foo="foo" data-bar="Hello">Hello</div>)).toBe(false);

    expect(wrapper.contains(<div data-foo="foo" data-bar="bar" />)).toBe(false);

    // 传入数组有顺序之分
    expect(wrapper.contains([<div data-foo="foo" data-bar="bar">Hello</div>, <span>Hello</span>])).toBe(true)
  })

  it('test equals', () => {
    const wrapper = shallow(
      <Msg msg="equals" />
    )

    expect(wrapper.equals(<div>equals</div>)).toBe(true)
  })

  it('test matchsElement', () => {
    const wrapper = shallow(
      <Msg msg="matchsElement" />
    )

    expect(wrapper.matchesElement(<div>matchsElement</div>)).toBe(true)
  })

  it('test is', () => {
    const wrapper = shallow(
      <div className="some-class other-class" />
    )

    expect(wrapper.is('.some-class')).toBe(true)
  })

  it('test children', () => {
    const wrapper = shallow(
      <ul>
        <li>1</li>
        <li>2</li>
        <li>3</li>
      </ul>
    )

    expect(wrapper.children()).toHaveLength(3)
    expect(wrapper.childAt(2).text()).toBe('3')
  })

  it('test shallow', () => {
    const wrapper = shallow(
      <UseFoo className="foo">
        11
      </UseFoo>
    )

    expect(wrapper.find('.inner')).toHaveLength(0)
    expect(wrapper.find(Foo)).toHaveLength(3)
    expect(wrapper.find(Foo).map(item => {
      return item.shallow().find('.inner')
    })).toHaveLength(3)
  })

  it('test renderProp', () => {
    const wrapper = shallow(
      <UseMouse/>
    ).find('Mouse').renderProp('render')(10, 20)

    expect(wrapper.equals(<h1>The mouse position is (10, 20)</h1>)).toBe(true)
  })

  it('test unmount', () => {
    const fn = jest.fn()
    const wrapper = shallow(
      <UnMount fn={fn} id="foo" />
    )

    expect(fn).toHaveBeenCalledTimes(0)
    wrapper.unmount()
    expect(fn).toHaveBeenCalledTimes(1)
  })

  it('test state', () => {
    // for the root node of the wrapper
    const wrapper = shallow(
      <UseMouse/>
    ).find('Mouse').shallow()

    expect(wrapper.state('x')).toBe(0)
  })

  it('test setState', () => {
    const wrapper = shallow(
      <SetName/>
    )

    expect(wrapper.find('.foo').length).toBe(1)
    expect(wrapper.find('.bar')).toHaveLength(0)
    wrapper.setState({
      name: 'bar'
    })
    expect(wrapper.find('.foo')).toHaveLength(0)
    expect(wrapper.find('.bar')).toHaveLength(1)
  })

  it('test context', () => {
    const wrapper = shallow(
      <SetName/>,
      {
        context: { foo: 10 }
      }
    )

    // expect(wrapper.context('foo')).toEqual(10) context API 测试不可用
  })

  it('test key()', () => {
    const wrapper = shallow(
      <ul>
        {['foo', 'bar'].map(s => <li key={s}>{s}</li>)}
      </ul>
    ).find('li')

    expect(wrapper.at(0).key()).toEqual('foo')
  })

  it('test setProp', () => {
    const spy = jest.spyOn(Msg.prototype, 'componentWillReceiveProps')

    const wrapper = shallow(
      <Msg msg="foo" />
    )

    expect(spy).toHaveBeenCalledTimes(0)

    wrapper.setProps({ msg: 'boo' });

    expect(spy).toHaveBeenCalledTimes(1)

    spy.mockRestore()
  })
});

