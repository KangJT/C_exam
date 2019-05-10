

export default {

  namespace: 'questions',

  state: {
    isShow:false
  },
  effects: {
    
  },
  reducers: {
    changeState(state, action) {
      return {...state, ...action }
    }
  }
}