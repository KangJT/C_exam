import React, { Component } from 'react'
import { Table } from 'antd';
import {connect} from 'dva'
const columns = [{
  title: '班级名',
  dataIndex: 'name',
}, {
  title: '课程名',
  dataIndex: 'age',
}, {
  title: '阅卷状态',
  dataIndex: 'address',
}, {
  title: '课程名称',
  dataIndex: 'classname',
}, {
  title: '成材率',
  dataIndex: 'success',
},{
  title: '操作',
  dataIndex: 'action',
}
];
let datas = [];

class WaitClass extends Component {
  constructor(){
    super()
    this.state={
        arrlist:[]
    }
  }
  toDetail = (item) => {
    this.props.history.push({ pathname: '/marking/waitDetail', state: {id: item.grade_id}})
  }
  render(){
    let {getReadExamList} = this.props;
    if(getReadExamList.length !== 0) {
      datas = []
      getReadExamList.forEach(item => {
        datas.push({
          key: item.grade_id,
          name: item.grade_name,
          age: item.subject_text,
          address: item.status === 0 ? '未批卷': '',
          classname: item.subject_text,
          success: item.room_text,
          action: <a href="javaScript:;" onClick={() => this.toDetail(item)}>批卷</a>
        })
      })
    }
    return (
      <div>
        <Table columns={columns} dataSource={datas?datas:''} size="middle" />
      </div>
    )
  }
  componentDidMount(){
    this.props.dispatch({
      type:"getReadExamList/getReadExamList",
    })
  }
}
const mapState=store=>{
  return {
    ...store.getReadExamList
  }
}
export default connect(mapState)(WaitClass)
