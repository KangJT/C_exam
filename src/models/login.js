import {
  getLogin,
  getUserInfo
} from '@/api/index.js';
import {routerRedux} from 'dva/router';
import {message} from 'antd';

export default {

  namespace: 'login',

  state: {
    userInfo:{}
  },
  effects: {
    // 登录
    * getLogin(action, { call, put }) {
      let result = yield call(getLogin, action.body);
      if (result.code === 1) {
          // 存本地
          message.success('登录成功')
          yield put({type:'getUserInfo'})
          localStorage.setItem('token', result.token);
          yield put(routerRedux.push('/'))
      } else { //用户名密码错误
          message.error('用户名或密码错误')
      }
    },
     //获取当前用户信息
    *getUserInfo(action,{call,put}){
      let result = yield call(getUserInfo);
      yield put({
        type:'changeState',
        payload:result
      })
    },
  },
  reducers: {
    changeState(state, {payload}) {
      return {
        ...state,
        userInfo:payload.data
      }
    }
  }
}
