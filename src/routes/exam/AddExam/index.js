import React, { Component } from 'react'
import { connect } from 'dva'
import { Form, Input, Select, DatePicker, Button, InputNumber  } from 'antd';
import styles from './style.less'
const { Option } = Select;

const mapState = state => {
  let { examType, classS } = state.exams
  return {
    examType, classS
  }
}
@connect(mapState)
class RegistrationForm extends Component {
  state = {
    startValue: null,
    endValue: null,
    endOpen: false,
  };
  handleChange() {
    this.props.dispatch({
      type: 'exams/getAllExamType'
    })
    this.props.dispatch({
      type: 'exams/getAllClass'
    })
  }

  componentDidMount() {
    this.handleChange()
  }

  disabledStartDate = (startValue) => {
    const endValue = this.state.endValue;
    if (!startValue || !endValue) {
      return false;
    }
    return startValue.valueOf() > endValue.valueOf();
  }

  disabledEndDate = (endValue) => {
    const startValue = this.state.startValue;
    if (!endValue || !startValue) {
      return false;
    }
    return endValue.valueOf() <= startValue.valueOf();
  }

  onChange = (field, value) => {
    this.setState({
      [field]: value,
    });
  }

  onStartChange = (value) => {
    this.onChange('startValue', value);
  }

  onEndChange = (value) => {
    this.onChange('endValue', value);
  }

  handleStartOpenChange = (open) => {
    if (!open) {
      this.setState({ endOpen: true });
    }
  }

  handleEndOpenChange = (open) => {
    this.setState({ endOpen: open });
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        let payload = {
          subject_id: values.nextType,
          exam_id: values.type,
          title: values.name,
          number: values.num ? values.num*1 : 4,
          start_time: values.startTime.valueOf(),
          end_time: values.endTime.valueOf()
        }
        /* this.props.dispatch({
          type: 'exams/addNewExams',
          params: payload
        }).then(() => {
          this.props.form.resetFields();
        }) */
        this.props.history.push({pathname:'/exam/addExam', state: payload})
      }
    })
  }
  
  render() {
    const { getFieldDecorator } = this.props.form;
    const { endOpen } = this.state;
    let { examType, classS } = this.props;
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 8 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 },
      }
    };
    return (
      <Form {...formItemLayout} onSubmit={this.handleSubmit}>
        <Form.Item label="试卷名称">
          {getFieldDecorator('name', {
            rules: [{ required: true}]
          })(
            <Input/>
          )}
        </Form.Item>
        <Form.Item label="选择考试类型">
          {getFieldDecorator('type', {
            rules: [{ required: true }],
          })(
            <Select style={{ width: 120 }} placeholder="请选择类型">
              {
                examType.map((item, i ) => {
                  return <Option value={item.exam_id} key={item.exam_id}>{item.exam_name}</Option>
                })
              }
            </Select>
          )}
        </Form.Item>
        <Form.Item label="选择课程">
        {getFieldDecorator('nextType', {
            rules: [{ required: true }],
          })(
            <Select style={{ width: 120 }} placeholder="请选择课程">
              {
                classS.map((item, i ) => {
                  return <Option value={item.subject_id} key={item.subject_id}>{item.subject_text}</Option>
                })
              }
            </Select>
          )}
        </Form.Item>
        <Form.Item label="设置题量">
          {getFieldDecorator('num')(
            <InputNumber min={1} max={10} placeholder='4' />
          )}
        </Form.Item>
        <Form.Item label="开始时间">
          {getFieldDecorator('nextType', {
            rules: [{ required: true }],
          })(
            <div className={styles.times}>
              <Form.Item>
                {getFieldDecorator('startTime')(
                  <DatePicker
                    disabledDate={this.disabledStartDate}
                    showTime
                    format="YYYY-MM-DD HH:mm:ss"
                    placeholder="开始时间"
                    onChange={this.onStartChange}
                    onOpenChange={this.handleStartOpenChange}
                  />
                )}
              </Form.Item>
              <span className={styles.timesIn}> - </span>
              <Form.Item>
                {getFieldDecorator('endTime')(
                  <DatePicker
                    disabledDate={this.disabledEndDate}
                    showTime
                    format="YYYY-MM-DD HH:mm:ss"
                    placeholder="结束时间"
                    onChange={this.onEndChange}
                    open={endOpen}
                    onOpenChange={this.handleEndOpenChange}
                  />
                )}
              </Form.Item>
            </div>
          )}
        </Form.Item>
        <Button type="primary" htmlType="submit">创建试卷</Button>
      </Form>
    );
  }
}

export default Form.create({ name: 'register' })(RegistrationForm);