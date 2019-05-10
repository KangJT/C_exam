import React, { Component } from 'react'
import styles from './style.less'
import { message } from 'antd';
import { connect } from 'dva';

//考试详情
const mapState = (state) => {
  let { examList } = state.exams
  return { examList }
}
@connect(mapState)
class ExamDefaultPage extends Component {
  componentDidMount() {
    this.props.dispatch({
      type: 'exams/getExamList'
    })
  }
  render() {
    let { examList } = this.props
    if(examList.length !== 0) {
      let detailData = examList.filter(item => item.exam_exam_id === this.props.location.state.id)[0]
      return (
        <div>
          <h3>{detailData.title}</h3>
          <h3>{detailData.subject_text}</h3>
        </div>
      )
    } else {
      message.error('数据为空');
      return (
        <div>暂无数据</div>
      )
    }
  }
}

export default ExamDefaultPage
