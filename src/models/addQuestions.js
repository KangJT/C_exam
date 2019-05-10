import {getAllClass,getAllExamType,getQuestionsType,addQuestions,getUpdate} from '@/api/index.js';
import {message} from 'antd'
export default {

  namespace: 'addQuestions',

  state: {
    allClass:[],
    allExamtype:[],
    allQuestionstype:[],
    allQuestions:[]
  },
  effects: {
    *getAllClass({payload},{put,call}){
      let result = yield call(getAllClass)
      yield put({
        type:'changeAllClass',
        payload:result
      })
    },
    *getAllExamType({payload},{put,call}){
      let result = yield call(getAllExamType)
      yield put({
        type:'changeAllExamType',
        payload:result
      })
    },
    *getQuestionsType({payload},{put,call}){
      let result = yield call(getQuestionsType)
      yield put({
        type:'changeAllQuestionsType',
        payload:result
      })
    },
    *addQuestions(action,{put,call}){
      let result = yield call(addQuestions,action.body)
      if(result.code===1){
        message.success('试题添加成功')
        yield put({
          type:'changeAllQuestions',
          payload:result
        })
      }else{
        message.error('试题添加失败')
      }
    },
    *getUpdate(action,{put,call}){
      let result = yield call(getUpdate,action.body)
      if(result.code===1){
        message.success('试题编辑成功')
        yield put({
          type:'changeAllQuestions',
          payload:result
        })
      }else{
        message.error('试题编辑失败')
      }
    }
  },
  reducers: {
    changeAllClass(state, { payload }) {
      return {
        ...state,
        allClass:payload.data
      }
    },
    changeAllExamType(state, { payload }) {
      return {
        ...state,
        allExamtype:payload.data
      }
    },
    changeAllQuestionsType(state, { payload }) {
      return {
        ...state,
        allQuestionstype:payload.data
      }
    },
    changeAllQuestions(state, { payload }) {
      return {
        ...state,
        allQuestions:payload.data
      }
    }
  }
}