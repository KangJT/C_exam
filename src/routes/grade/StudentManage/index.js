import React, { Component } from 'react'
import { Table, Button, Input,Form,Select,Col } from 'antd';
import {connect} from 'dva'
import style from './style.less'
const Option = Select.Option;
class StudentManage extends Component {
    constructor(){
        super()
        this.state ={
            list:[],
            newlist:[],
            columns:[{
              title: '姓名',
              dataIndex: 'student_name',
              key: 'student_name'
            },
            {
              title: '学号',
              dataIndex: 'student_id',
              key: 'student_id'
            },
            {
              title: '班级',
              dataIndex: 'grade_name',
              key: 'grade_name'
            },
            {
              title: '教室',
              dataIndex: 'room_text',
              key: 'room_text'
            },
            {
              title: '密码',
              dataIndex: 'student_pwd',
              key: 'student_pwd'
            },{
              title: '操作',
              key: 'action',
              render: (text, record) => <Button onClick={() => {
                this.deleteStudent(record)
              }}>删除</Button>
            }] 
        }
    }
    render(){
      let {getStudentsManageList}=this.props;
      const { getFieldDecorator } = this.props.form;
      let {getClassRoomManage}=this.props;
      let {getGradeManageList}=this.props;
        return <div>
            <div>
               <div style={{margin:'20px 0',display:'flex'}}>
                <Form layout="inline" onSubmit={this.handleSubmit}>
                  <Form.Item>
                    {getFieldDecorator('user')(
                      <Input placeholder="输入学生姓名" />
                    )}
                  </Form.Item>
                  <Form.Item>
                      <Col span={6}>
                      {getFieldDecorator('grade')(
                        <Select
                          style={{ width: 120 }}
                          placeholder="输入教室号" 
                        >
                          {getClassRoomManage &&
                            getClassRoomManage.map((item, index) => (
                              <Option
                                id={item.room_id}
                                value={item.room_id}
                                key={index}
                              >
                                {item.room_text}
                              </Option>
                            ))}
                      </Select>)}
                      </Col>
                  </Form.Item>
                  <Form.Item>
                      <Col span={6}>
                      {getFieldDecorator('classroom')(
                        <Select
                          style={{ width: 120 }}
                          placeholder="输入班级名"
                        >
                          {getGradeManageList &&
                            getGradeManageList.map((item, index) => (
                              <Option
                                id={item.grade_id}
                                value={item.grade_id}
                                key={item.grade_id}
                              >
                                {item.grade_name}
                              </Option>
                            ))}
                      </Select>)}
                      </Col>
                   </Form.Item>
                  <Button type="primary" htmlType="submit" className="login-form-button">
                     搜索
                  </Button>
                </Form>
                <Button type="primary" onClick={this.clearStudent} className={style.loginformbutton}>重置</Button> 
               </div>
                <Table columns={this.state.columns}  dataSource={getStudentsManageList} />
            </div>
        </div>
    }
    componentDidMount(){
        this.getStudents();
        this.handleChangeClass()
    }
    getStudents=()=>{
      this.props.dispatch({
        type:"studentsManage/getStudentsManage",
      })
    }
    //删除学生
   deleteStudent = (i) =>{
     this.props.dispatch({
        type:"studentsManage/getStudentdsDelete",
        body:{
          'id': i.student_id
         }
      })
    this.getStudents() 
  }
  clearStudent(){
    console.log('重置');
    this.getStudents()
  }
 //查询
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.dispatch({
      type:"studentsManage/getStudentsManage",
    }).then(() => {
      this.props.form.validateFields((err, values) => {
        if (!err) {
          let newList=this.props.getStudentsManageList;
          if(!values.user && !values.grade && !values.classroom) {
            this.getStudents();
          } else {
            if(values.user){
              newList= newList.filter((item)=>item.student_name===values.user);
            }
            if(values.grade) {
              newList= newList.filter((item)=>item.room_id===values.grade);
            }
            if(values.classroom) {
              newList= newList.filter((item)=>item.grade_id===values.classroom);
            }
            this.props.dispatch({
              type: 'studentsManage/newData',
              body: {
                datas: newList
              }
            })
          }
        }
      });
    })
  }
 //教室班级默认
  handleChangeClass=()=>{
    this.props.dispatch({
      type:"studentsManage/getClassRoomManage",
    }) 
    this.props.dispatch({
      type:"studentsManage/getGradeManage",
    }) 
  }
}

const mapState=store=>{
    return {
      ...store.studentsManage
    }
}
export default connect(mapState)(Form.create()(StudentManage));




