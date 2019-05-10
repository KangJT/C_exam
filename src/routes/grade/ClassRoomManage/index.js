import React, { Component } from 'react'
import { Table, Button, Input } from 'antd';
import {connect} from 'dva'

class ClassRoomManage extends Component {
    constructor(){
        super()
        this.state ={
            list:[],
            timer:null,
            value:'',
            item_id:"",
            columns: [{
              title: '教室号',
              dataIndex: 'room_text',
              key: 'name',
              render: text => <span>{text}</span>,
            },{
              title: '操作',
              key: 'action',
              render: (text, record) => <Button onClick={() => {
                this.deleteClass(record)
              }}>删除</Button>
            }]
        }
    }
    
    render(){
        let {getClassRoomManage}=this.props;
        return <div>
            <div>
               <div style={{margin:'20px 0',display:'flex'}}>
                <Button type="primary" onClick={this.addClass}>添加教室</Button>
                <Input placeholder="请输入教室号" style={{margin:'0 20px',width:"180px"}} allowClear onChange={this.onChange} />
               </div>
                <Table columns={this.state.columns}  dataSource={getClassRoomManage} />
            </div>
        </div>
    }
    
    componentDidMount(){
        this.getClassRoom()
    }
    getClassRoom=()=>{
        this.props.dispatch({
          type:"classRoomManage/getClassRoomManage",
      }) 
    }
    //点击添加
    addClass=()=>{
        this.props.dispatch({
            type:"classRoomManage/getClassRoomManageAdd",
            body:{
               'room_text': this.state.value
            }
       }) 
       this.value="";
       this.getClassRoom()
    }
    //获取input的值
    onChange=(e)=>{
      this.setState({
        value:e.target.value
      })
    };
    //删除班级
   deleteClass = (i) =>{
     this.props.dispatch({
        type:"classRoomManage/getClassRoomManageDelete",
        body:{
          'room_id': i.room_id
         }
      })
      this.getClassRoom() 
  }
}

const mapState=store=>{
      return {
        ...store.classRoomManage
      }
  }
export default connect(mapState)(ClassRoomManage)




