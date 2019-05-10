import {getAllClass,getAllExamType,getQuestionsType,getCheckList,getQuestionsList} from '@/api/index.js';

export default {

  namespace: 'checkQuestions',

  state: {
    visible: false,
    allClass:[],
    allExamtype:[],
    allQuestionstype:[],
    questionsList:[]
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
    *getQuestionsList({payload},{put,call}){
      let result = yield call(getQuestionsList)
      yield put({
        type:'changeQuestionsList',
        payload:result
      })
    },
    *getCheckList(action,{put,call}){
      let result = yield call(getCheckList,action.params)
      yield put({
        type:'changeQuestionsList',
        payload:result
      })
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
    changeQuestionsList(state, { payload }) {
      return {
        ...state,
        questionsList:payload.data
      }
    }
  }
}