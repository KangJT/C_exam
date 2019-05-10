import React, { Component } from 'react'
import { Modal,Button,Form, Icon, Input } from 'antd';
import {connect} from 'dva';

class Modals extends Component {

  state = { visible: false }

  showModal=()=>{
    this.setState({visible: true})
  }

  handleCancel = (e) => {
    this.setState({visible: false});
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.props.dispatch({type:'class/getAddClass', body: {
          'grade_name': values.class,
          'room_id': values.Classroom,
          'subject_id':values.curriculum
        }})
        this.setState({visible: false});
      }
    });
  }

  render(){
    let { getFieldDecorator } = this.props.form;
    return <div>
        <Button type="primary" onClick={this.showModal}>+添加班级</Button>
        <Modal
          title="Basic Modal"
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          footer={[
            <Button key="back" onClick={this.handleCancel}>取消</Button>,
            <Button key="submit" type="primary" onClick={this.handleSubmit}>
              提交
            </Button>,
          ]}
        >
          <Form onSubmit={this.handleSubmit}>
            <Form.Item>
              {getFieldDecorator('class', {
                rules: [{ required: true, message: '请输入班级号' }],
              })(
                <Input placeholder="班级号" />
              )}
            </Form.Item>
            <Form.Item>
              {getFieldDecorator('Classroom', {
                rules: [{ required: true, message: '请输入教室号' }],
              })(
                <Input placeholder="教室号" />
              )}
            </Form.Item>
            <Form.Item>
              {getFieldDecorator('curriculum', {
                rules: [{ required: true, message: '请输入课程名' }],
              })(
                <Input placeholder="课程名" />
              )}
            </Form.Item>
          </Form>
        </Modal>
    </div>
  }
}

const mapState=store=>{
  return {
    ...store.class
  }
}

export default connect(mapState)(Form.create()(Modals));