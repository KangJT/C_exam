import React, { Component } from 'react'
import { Layout, Avatar,Menu,Dropdown} from 'antd'
import { Switch, Route,Redirect } from 'dva/router'
import {connect} from 'dva';

import styles from './style.less'

import DocumentTitle from '@/components/DocumentTitle/index.js'
import Authorization from '@/components/Authorization/index.js'
import SlideMenu from '@/layout/SystemLayout/SlideMenu'
import { getLayoutRoute,getLayoutRedirect,getRouterTitle } from '@/config/router.config.js'


const { Header, Content } = Layout


@connect((state)=>{
    let {userInfo}=state.login;
    return {
      userInfo
    }
})

@Authorization

class SystemLayout extends Component {
  componentDidMount(){
    this.props.dispatch({type:'login/getUserInfo'})
  }

  get title(){
    let newPath=''
    if(this.props.location.pathname.indexOf('?')!==-1){
      newPath=this.props.location.pathname.slice(0,this.props.location.pathname.indexOf('?'))
    }else{
      newPath=this.props.location.pathname
    }
    return getRouterTitle(newPath).title
  }

  render () {
    let {user_name}=this.props.userInfo;
    const menu = (
      <Menu>
        <Menu.Item key="1">个人中心</Menu.Item>
        <Menu.Item key="2">我的班级</Menu.Item>
        <Menu.Item key="3">设置</Menu.Item>
        <Menu.Item key="4" onClick={()=>{
            localStorage.clear('token');
            this.props.history.push('/login');
        }}>退出登录</Menu.Item>
      </Menu>
    );
    return (
      <div className={styles.wrap}>
        <Layout>
          <Header className='header'>
            <div className="img_Icon">
              <img src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1551624718911&di=4a7004f8d71bd8da84d4eadf1b59e689&imgtype=0&src=http%3A%2F%2Fimg105.job1001.com%2Fupload%2Falbum%2F2014-10-15%2F1413365052_95IE3msH.jpg" alt="" />
            </div>
            <div className="user_info">             
              <Dropdown overlay={menu}>
                <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
              </Dropdown>  
              <span>{user_name}</span>
            </div>
          </Header>
          <Layout>
            <SlideMenu />
            <Layout style={{ padding: '0 24px 24px' }}>
              <Content
                style={{
                  background: '#fff',
                  padding: 24,
                  margin: 0,
                  minHeight: 280
                }}
              >
                <DocumentTitle title={this.title}/>
                <Switch>
                  {getLayoutRedirect('SystemLayout').map(item => {
                    return <Redirect
                      exact
                      key={item.to}
                      to={item.to}
                      from={item.from}
                    />
                  })}
                </Switch>
                <Switch>
                  {getLayoutRoute('SystemLayout').map(item => {
                    return <Route
                      exact
                      path={item.path}
                      key={item.name}
                      component={item.component}
                    />
                  })}
                </Switch>
              </Content>
            </Layout>
          </Layout>
        </Layout>
      </div>
    )
  }

  componentWillMount(){
    if(!localStorage.getItem('token')){
        //请先登录提示！
        alert('请先登录？')
        this.props.history.push('/login')
    }
  }

  componentDidMount(){
    this.props.dispatch({type:'login/getUserInfo'}) 
  }
}

const mapState=store=>{
  return {
    ...store.login
  }
}

export default connect(mapState)(SystemLayout);
