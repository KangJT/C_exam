import React, { Component } from 'react'
import Showless from './style.less'
import { Radio,Table } from 'antd';
import {connect} from 'dva'
import headerlist from './headerData'

const navlist=['用户数据','身份数据','api接口','身份和api接口关系','视图接口权限','身份和视图权限关系']
const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;
class ShowUser extends Component {
  constructor(){
    super()
    this.state={
        arrlist:[],
        titleData:"用户数据",
        ind:0
    }
}
  render(){
    let {getShowUserlist}=this.props;
    // console.log(getShowUserlist)
    return (
      <div className={Showless.k_list}>
        <div>
              <RadioGroup onChange={this.onChange} defaultValue="用户数据">
              {
                navlist.map((item,index)=>{
                  return <RadioButton  value={item} key={index} onClick={()=>this.handelClick(index)}>{item}</RadioButton>
                })
              }
              </RadioGroup>
            </div>
        <div>
          <h4 className={Showless.k_h4}>{this.state.titleData}</h4>
          <Table columns={headerlist[this.state.ind]} 
          dataSource={getShowUserlist}
          pagination={{pageSize:4}}
          size="middle" 
          rowKey={getShowUserlist.user_name}/>
        </div>
    </div>
    );
  }

  handelClick=(index)=>{
    this.setState({ind:index});
    this.props.dispatch({
      type:"ShowUser/getShowUser",
      index
    })
  }

  // 初始请求数据
  componentDidMount(){
    let index=this.state.ind;
    this.props.dispatch({
      type:"ShowUser/getShowUser",
      index
    }) 
  }
  //点击同步更新标题
  onChange=(e)=>{
    this.setState({
      titleData:e.target.value
    })
  }
}

const mapState=store=>{
    return {
      ...store.ShowUser
    }
}
export default connect(mapState)(ShowUser)