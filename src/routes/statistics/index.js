import React, { Component } from 'react'
import {connect} from 'dva';

class Statistics extends Component {
  componentDidMount(){
    this.props.dispatch({
      type:'Lcon/getLconData'
    })
  }
  render(){
    return <div>
        数据统计
    </div>
  }
}

const mapState=store=>{
  console.log(store)
  return {
    ...store.Lcon
  }
}

export default connect(mapState)(Statistics);