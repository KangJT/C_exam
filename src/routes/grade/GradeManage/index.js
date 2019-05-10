
import React, { Component } from 'react'
import { Table,} from 'antd';
import {connect} from 'dva';
import Modal from '@/components/Modal';

const columns = [{
  title: '班级名',
  dataIndex: 'grade_name',
  key: 'name'
}, {
  title: '课程名',
  dataIndex: 'subject_text',
  key: 'age',
}, {
  title: '教室号',
  dataIndex: 'room_text',
  key: 'address',
}, 
{
  title: '操作',
  key: 'action',
  render: (text, record) => (
    <span>
      <a href=" javascript:;">修改 | </a>
      <a href=" javascript:;">删除</a>
    </span>
  ),
}];

class GradeManage extends Component {

  componentDidMount(){
    this.props.dispatch({
      type:'class/getClassManagement'
    })
  }
  
  del(record,rowkey){
    console.log(rowkey)
    // let grade_id=record.grade_id;
    // this.props.dispatch({
    //   type:'class/getRemoveClass',
    //   grade_id
    // })
  }

  render(){
    let {classData}=this.props;
    return <div>
            <div>
              <Modal/>
              <Table columns={columns} dataSource={classData} rowKey='grade_id'
                onRow={(record,rowkey)=>{
                    return{   
                        onClick : this.del.bind(this,record,rowkey)    //点击行 record 指的本行的数据内容，rowkey指的是本行的索引   
                    }    
                }}
              />
            </div>
    </div>
  }
}

const mapState=store=>{
  return {
    ...store.class
  }
}

export default connect(mapState)(GradeManage)