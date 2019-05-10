import {getQuestionsType,addQuestionsType,getDelte} from '@/api/index.js';

export default {

  namespace: 'questionsType',

  state: {
    visible: false,
    typelist:[]
  },
  effects: {
    * getQuestionsType({payload},{call,put}){
      let result = yield call(getQuestionsType);
      yield put({
        type:'changeUpdateState',
        payload:result
      })
    },
    *addQuestionsType(action,{put,call}){
      let result = yield call(addQuestionsType,action.params)
      yield put({
        type:'changeUpdateState',
        payload:result
      })
    },
    *getDelte(action,{put,call}){
      let result = yield call(getDelte,action.body)
      // console.log(result,'...result')
      yield put({
        type:'changeUpdateState',
        payload:result
      })
    }
  },
  reducers: {
    changeUpdateState(state, { payload }) {
      return {
        ...state,
        typelist: payload.data
      }
    }
  }
}