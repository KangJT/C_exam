import {getCheckList} from '@/api/index.js';

export default {

  namespace: 'questionsDetail',

  state: {
    questionsList:[]
  },
  effects: {
    *getCheckList(action,{put,call}){
      let result = yield call(getCheckList,action.params)
      yield put({
        type:'changeQuestionsList',
        payload:result
      })
    }
  },
  reducers: {
    changeQuestionsList(state, { payload }) {
      return {
        ...state,
        questionsList:payload.data
      }
    }
  }
}