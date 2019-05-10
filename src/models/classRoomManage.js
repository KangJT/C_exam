import {getClassRoomManage,getClassRoomManageAdd,getClassRoomManageDelete} from "@/api/index"
import {message} from 'antd'
export default {
  namespace:"classRoomManage",
  state:{
     getClassRoomManage:[],
     timer:null
  },
  reducers:{
    changeUpdataState(state,action){
      return {
        ...state,...action
      }
    }
  },
  effects:{
    * getClassRoomManage ({payload},{call,put}){
      let request=yield call(getClassRoomManage);
      if(request.code===1){
        yield put({
          type:'changeUpdataState',
          getClassRoomManage:request.data
        })
      }    
    },
    * getClassRoomManageAdd (action,{call,put}){
      let request=yield call(getClassRoomManageAdd,action.body);
      console.log(request)
      if(request.code===1){
        yield put({
          type:'changeUpdataState'
        })
        message.success('添加成功')
      }else{
        message.error('添加失败')
      }    
    },
    *getClassRoomManageDelete(action,{call,put}){
      let request=yield call(getClassRoomManageDelete,action.body);
      if(request.code===1){
        yield put({
          type:'changeUpdataState'
        })
        message.success('删除成功')
      }else{
        message.error('删除失败')
      }  
    }
  }
}

