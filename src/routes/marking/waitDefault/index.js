import React, { Component, Fragment } from 'react'
import { connect } from 'dva'
import {Table} from 'antd'
import styles from './style.less'
import FormComponentM from '@components/formComponentM/index.js'


let mapState = state => {
  return {
    ...state.getReadExamList
  }
}
const columns = [{
  title: '班级',
  dataIndex: 'class',
}, {
  title: '姓名',
  dataIndex: 'name',
}, {
  title: '阅卷状态',
  dataIndex: 'watchType',
}, {
  title: '开始时间',
  dataIndex: 'startTime',
}, {
  title: '结束时间',
  dataIndex: 'endTime',
}, {
  title: '成绩',
  dataIndex: 'rateTalent',
}, {
  title: '操作',
  dataIndex: 'adress',
}];
let data = [];

@connect(mapState)

class waitClassDefault extends Component {
  componentDidMount() {
    this.props.dispatch({
      type: 'getReadExamList/getStudentExamList',
      params: this.props.location.state.id
    })
  }
  toInDefault(item) {
    console.log(item)
    this.props.history.push({
      pathname: '/marking/waitDetailIn',
      state: {id: item.grade_id, studentId: item.exam_student_id}
    })
  }
  render() {
    let { studentExamList } = this.props
    data = []
    if(studentExamList) {
      data = studentExamList.map(item => {
        return {
          key: item.exam_student_id,
          class: item.grade_id,
          name: item.student_name,
          watchType: item.status === 0 ? '未批卷' : '已批卷',
          startTime: item.start_time,
          endTime: item.end_time,
          rateTalent: item.score,
          adress: <a href=" javaScript:;" onClick={() => this.toInDefault(item)}>批卷</a>
        }
      })
    }
    return (
      <Fragment>
        <div className={styles.formBox}>
          <FormComponentM />
        </div>
        <div className={styles.tableBox}>
          <Table columns={columns} dataSource={data} size="middle" />
        </div>
      </Fragment>
    )
  }
}

export default waitClassDefault