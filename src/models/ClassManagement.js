import {getClassManagement,getAddClass,getRemoveClass} from '@/api/index.js';
import {message} from 'antd';

export default {
  namespace: 'class',
  state: {
    classData:[],
    success:''
  },
  effects: {
    // 班级管理（获取已经分配教室的班级的接口）
    *getClassManagement(action, { call, put }){
      let result = yield call(getClassManagement);
      if(result.code===1){
        yield put({ type: 'changeState', classData:result.data});
      }
    },
    // 添加班级
    *getAddClass(action, { call, put }){
      let result = yield call(getAddClass,action.body);
      if(result.code===1){
        yield put({ type: 'changeState', success:result.grade_id});
        yield put({ type: 'changeState', classData:result.data});
        message.success('创建班级成功')
      }else{
        message.success('创建班级成功')
      }
    },
    // 删除班级
    *getRemoveClass(action, { call, put }){
      let result = yield call(getRemoveClass,action);
      if(result.code===1){
        yield put({ type: 'changeState', classData:result.data});
        message.success(result.msg)
      }else{
        message.success(result.msg)
      }
    }
  },
  reducers: {
    changeState(state,action) {
      return {
        ...state,...action
      }
    }
  }
}
