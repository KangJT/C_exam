import NormalLoginForm from '@/components/userLoginFrom/index'
import {Component} from 'react'
import style from './style.less'


class Login extends Component {
  render () {
    return (
      <div className={style.userLoginIndex}>
        <LoginBox />
      </div>
    )
  }
}

const LoginBox = () => {
  return (<div className={style.userLoginBox}>
    <h3 className={style.loginText}>登录</h3>
    <NormalLoginForm />
  </div>)
}

export default Login