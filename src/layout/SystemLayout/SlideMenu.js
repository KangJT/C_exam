import React, { Component, Fragment } from 'react'
import { Layout, Menu, Icon } from 'antd'
import { Link ,withRouter} from 'dva/router'
import { getLayoutMenu } from '@/config/router.config.js'

const SubMenu = Menu.SubMenu
const { Sider } = Layout

@withRouter
class SlideMenu extends Component {
  constructor(props){
    super(props)
    this.state={
      collapsed: false,
      selectedKeys:this.props.location.pathname,
      openKeys:`/${this.props.location.pathname.split('/')[1]}`
    }
  }

  onCollapse = collapsed => {
    this.setState({ collapsed })
  }
  render () {
    const menu = getLayoutMenu('SystemLayout');
    return (
      <Fragment>
        <Sider
          collapsible
          collapsed={this.state.collapsed}
          // onCollapse={this.onCollapse}
        >
          <Menu 
          theme='dark' 
          defaultSelectedKeys={[this.state.selectedKeys]} 
          defaultOpenKeys={[this.state.openKeys]}
          mode='inline'>
            {
              menu.map((item)=>{
                return (
                  <SubMenu key={item.path} title={<span><Icon type='user' />{item.title}</span>}>
                    {item.children.map((subItem)=>(
                        subItem.flag?<Menu.Item key={subItem.path}>
                          <Link to={subItem.path}>{subItem.title}</Link>
                        </Menu.Item>:null
                    ))}
                  </SubMenu>
                )
              })
            }
          </Menu>
        </Sider>
      </Fragment>
    )
  }
}

export default SlideMenu
