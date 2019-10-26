/* eslint-disable no-script-url */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component, Fragment } from 'react'
import './index.less'

class NavItem extends Component {
  renderContent = () => {
    const { hrefs } = this.props;
    if (hrefs.length > 1) {
      return this.renderBatchList(hrefs);
    } else {
      return this.renderSingleList(hrefs);
    }
  }

  renderBatchList = (hrefs) => {
    const { selectKey, activeKey, secondKey } = this.props;
    return (
      <Fragment>
        <a href="javascript:;">{this.props.title}</a>
        <ol className={selectKey === activeKey ? 'active' : ''}>
          {
            hrefs.map((item, index) => {
              return (
                <NavItem selectKey={selectKey === activeKey ? secondKey : '' } activeKey={index + 1 + ''} hrefs={
                  [
                    {
                      href: item.href,
                      content: item.content
                    }
                  ]
                }></NavItem>
              )
            })
          }
        </ol>
      </Fragment>
    )
  }

  renderSingleList = (hrefs) => {
    return (
      <a href={hrefs[0].href}>{hrefs[0].content}</a>
    )
  }

  render() {
    const { selectKey, activeKey } = this.props;
    // let isActive = selectKey.split('-').includes(activeKey);
    return (
      <li className={selectKey === activeKey ? 'active' : ''}>{this.renderContent()}</li>
    )
  }
}

export default NavItem;