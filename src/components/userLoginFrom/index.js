import {Component} from 'react'
import { Form, Icon, Input, Button, Checkbox } from 'antd'
import {connect} from 'dva';
import style from './style.less'

class NormalLoginForm extends Component {
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        if (values.remember) {
          localStorage.setItem("userName", values.userName)
          localStorage.setItem("password", values.password)
        }
        this.props.dispatch({type:'login/getLogin', body: {
            'user_name': values.userName,
            'user_pwd': values.password
        }})
      }
    });
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Form onSubmit={this.handleSubmit} className={style.loginForm}>
        <Form.Item>
          {getFieldDecorator('userName', {
            rules: [{ required: true, message: '请您输入正确的用户名' }],
          })(
            <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="用户名" />
          )}
        </Form.Item>
        <Form.Item>
          {getFieldDecorator('password', {
            rules: [{ required: true, message: '请您输入正确的密码' }],
          })(
            <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="密码" />
          )}
        </Form.Item>
        <Form.Item>
          {getFieldDecorator('remember', {
            valuePropName: 'checked',
            initialValue: true,
          })(
            <Checkbox>记住账号</Checkbox>
          )}
          <Button type="primary" htmlType="submit" className={style.lloginFormButton}>
            登录
          </Button>
          <Button className={style.lloginFormButtonBg}>
            立即注册
          </Button>
        </Form.Item>
      </Form>
    );
  }
}

const mapStateToProps=store=>{
  return {
    ...store.example
  }
}


export default connect(mapStateToProps)(Form.create()(NormalLoginForm));
