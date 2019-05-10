import React, { Component, Fragment } from 'react'
import { Form, Button, Select } from 'antd'
import {connect} from 'dva'

let mapState = state => {
  return {
    ...state.getReadExamList
  }
}

@Form.create({ name: 'horizontal_login' })
@connect(mapState)

class FormComponentM extends Component {
  componentDidMount() {
    this.props.dispatch({
      type: 'getReadExamList/getReadExamList'
    })
  }
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.props.dispatch({
          type: 'getReadExamList/getStudentExamList',
          params: values.class
        })
      }
    });
  }
  render() {
    const { getFieldDecorator } = this.props.form;
    const Option = Select.Option;
    let { getReadExamList } = this.props;
    return (
      <Fragment>
        <Form layout="inline" onSubmit={this.handleSubmit}>
          <Form.Item label="状态">
            {getFieldDecorator('examType')(
              <Select style={{ width: 150 }}>
                <Option key='0' value='0'>未批卷</Option>
                <Option key='1' value='1'>已批卷</Option>
              </Select>
            )}
          </Form.Item>
          <Form.Item label="班级">
            {getFieldDecorator('class')(
              <Select style={{ width: 150 }}>
                {
                  getReadExamList.map(item=> {
                    return <Option key={item.grade_id} value={item.grade_id}>{item.grade_name}</Option>
                  })
                }
              </Select>
            )}
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">查询</Button>
          </Form.Item>
        </Form>
      </Fragment>
    )
  }
}

export default FormComponentM
