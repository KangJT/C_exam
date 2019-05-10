import { getAllExamType, getAllClass, addExam, getQuestionsType, getExamLists, getNewExam } from '@/api/index.js'
import { message } from 'antd';

export default {
  namespace: 'exams',
  state: {
    examType: [],
    classS: [],
    questionsType: [],
    examList: [],
    questions: []
  },
  effects: {
    *getAllClass({payload},{put,call}){
      let result = yield call(getAllClass)
      yield put({
        type:'changeAllClass',
        payload: result.data
      })
    },
    *getAllExamType({payload},{put,call}){
      let result = yield call(getAllExamType)
      yield put({
        type:'changeAllExamType',
        payload: result.data
      })
    },
    *getQuestionsType({payload},{put,call}){
      let result = yield call(getQuestionsType)
      yield put({
        type:'changeAllQuestionsType',
        payload: result.data
      })
    },
    * addNewExams (actions, {call, put}) {
      let getAddInfo = yield call(addExam, actions.params)
      if(getAddInfo.code === 1) {
        yield put({
          type:'changeQuestions',
          payload: getAddInfo.data
        })
      } else {
        message.error('创建失败');
      }
    },
    * getExamList({payload},{put,call}){
      let result = yield call(getExamLists)
      yield put({
        type:'changeExamList',
        payload: result.exam
      })
    },
    * getNewExam(actions, {put, call}) {
      let result = yield call(getNewExam, actions.params)
      console.log(result)
    }
  },
  reducers:{
    changeAllClass(state, {payload}) {
      return{
        ...state,
        classS: payload
      }
    },
    changeAllExamType(state, {payload}) {
      return{
        ...state,
        examType: payload
      }
    },
    changeAllQuestionsType(state, {payload}) {
      return{
        ...state,
        questionsType: payload
      }
    },
    changeExamList(state, {payload}) {
      return{
        ...state,
        examList: payload
      }
    },
    changeQuestions(state, {payload}) {
      return{
        ...state,
        questions: payload
      }
    }
  }
}