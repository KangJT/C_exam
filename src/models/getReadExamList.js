
import {getReadExamList, getStudentExamList, getOverExam} from '@/api/index.js';

export default {
  namespace:"getReadExamList",
  state:{
    getReadExamList: [],
    studentExamList: []
  },
  effects:{
    * getReadExamList (action,{call,put}){
      let request=yield call(getReadExamList);
      yield put({
        type:'changeUpdataState',
        payload: request.data
      })
    },
    * getStudentExamList (action, {call,put}) {
      let inData = {
        grade_id:action.params
      }
      let request = yield call(getStudentExamList, inData)
      yield put({
        type: 'getStudentExamLists',
        payload: request.exam
      })
    },
    * getOverExams (action, {call, put}) {
      let request = yield call(getOverExam, action.params)
      console.log(request)
    }
  },
  reducers:{
    changeUpdataState(state,{payload}){
      return {
        ...state,
        getReadExamList:payload
      }
    },
    getStudentExamLists(state, {payload}) {
      return {
        ...state,
        studentExamList: payload
      }
    }
  }
}
