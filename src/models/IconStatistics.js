import {getLconData} from '@/api/index.js';
export default {

  namespace: 'Lcon',

  state: {
    list:[]
  },
  effects: {
    // 总揽数量统计
    * getLconData(action, { call, put }) {
      let result = yield call(getLconData);
      console.log(result);
    }
  },
  reducers: {
    changeState(state, action) {
      return {
        ...state,...action
      }
    }
  }
}
