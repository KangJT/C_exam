import {getShowUser} from "@/api/index.js"
export default {
  namespace:"ShowUser",
  state:{
     getShowUserlist:[]
  },
  reducers:{
    changeUpdataState(state,action){
      return {
        ...state,...action
      }
    }
  },
  effects:{
    * getShowUser (action,{call,put}){
      let request=yield call(getShowUser,action);
      if(request.code===1){
        yield put({type:'changeUpdataState',getShowUserlist:request.data})
      }    
    }
  }
}

