import {getClassRoomManage,getStudentsManage,getStudentdsDelete,gerStudentSearch,getGradeManage} from "@/api/index"
import {message} from 'antd'
export default {
  namespace:"studentsManage",
  state:{
    getStudentsManageList:[],
    successStutend:[],
    getGradeManageList:[]
  },
  reducers:{
    changeUpdataState(state,action){
      return {
        ...state,...action
      }
    },
    newChangeUpdataState(state,{payload}){
      return {
        ...state,
        getStudentsManageList: payload
      }
    }
  },
  effects:{
    //默认的教室号全部
    * getClassRoomManage ({payload},{call,put}){
      let request=yield call(getClassRoomManage);
      if(request.code===1){
        yield put({
          type:'changeUpdataState',
          getClassRoomManage:request.data
        })
      }    
    },
    //默认的班级全部
    * getGradeManage({payload},{call,put}){
      let request=yield call(getGradeManage);
      if(request.code===1){
        yield put({
          type:'changeUpdataState',
          getGradeManageList:request.data
        })
      }    
    },
    //学生管理
    * getStudentsManage ({payload},{call,put}){
      let request=yield call(getStudentsManage);
      console.log(request,'request')
      if(request.code===1){
        yield put({
          type:'changeUpdataState',
          getStudentsManageList:request.data
        })
      }    
    },
    //删除学生
    * getStudentdsDelete(action,{call,put}){
      let request=yield call(getStudentdsDelete,action.body);
      if(request.code===1){
        yield put({
          type:'changeUpdataState'
        })
        message.success('删除成功')
      }else{
        message.error('删除失败')
      }  
    },
    *newData(action,{call,put}){
      yield put({
        type:"newChangeUpdataState",
        payload: action.body.datas
      })
    }
  }
}

