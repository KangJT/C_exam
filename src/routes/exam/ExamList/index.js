import React, { Component } from 'react'
import styles from './style.less'
import { connect } from 'dva'
import {
  Select, Button, Table
} from 'antd';
const { Option } = Select;

const columns = [
  { title: '试卷信息', width: 250, dataIndex: 'examInfo', key: '1', },
  { title: '班级', width: 250, dataIndex: 'class', key: '2', },
  { title: '创建人', width: 150, dataIndex: 'founder', key: '3' },
  { title: '开始时间', width: 200, dataIndex: 'startTime', key: '4' },
  { title: '结束时间', width: 200, dataIndex: 'endTime', key: '5' },
  { title: '操作', width: 80, dataIndex: 'address', key: '6' }
]
let data = []


const mapState = (state) => {
  let { examType, classS, examList } = state.exams
  return {
    examType, classS, examList
  }
}

@connect(mapState)

class ExamList extends Component {
  handleChange(value) {
    console.log(value)
  }
  componentDidMount() {
    this.props.dispatch({
      type: 'exams/getAllExamType'
    })
    this.props.dispatch({
      type: 'exams/getAllClass'
    })
    this.props.dispatch({
      type: 'exams/getExamList'
    })
  }
  handleSubmit = () => {
    this.props.dispatch({
      type: 'exams/getExamList'
    })
  }
  toDetail = (item) => {
    this.props.history.push({ pathname: '/exam/detail', state: {id: item.exam_exam_id}})
  }
  render(){
    let { examType, classS, examList } = this.props
    data = []
    examList.forEach(item => {
      data.push({
        key: item.exam_exam_id,
        examInfo: (<div><h1 className={styles.tableTitleInfo}>{item.title}</h1><p className={styles.tableInfo}>考试时间 : 1:30:00 4道题作弊0分</p></div>),
        class: (<div><h1 className={styles.tableTitleInfo}>考试班级</h1><p className={styles.tableInfo}>{item.grade_name.map(item => item + ' ')}</p></div>),
        founder: item.user_name,
        startTime: item.start_time,
        endTime: item.end_time,
        address: <a href="javaScript:;" onClick={() => this.toDetail(item)}>操作</a>
      })
    })
    return (<div>
        <div className={styles.minTop}>
          <div className={styles.checkType}>
            <span>考试类型 :</span>
            <div className={styles.EveryTypeCheck}>
              <Select style={{ width: 120 }} onChange={this.handleChange} placeholder="请选择考试类型">
                {
                  examType.map(item => {
                    return <Option value={item.exam_id} key={item.exam_id}>{item.exam_name}</Option>
                  })
                }
              </Select>
            </div>
            <span className={styles.typeTitle}>题目类型 :</span>
            <div className={styles.EveryTypeCheck}>
              <Select style={{ width: 120 }} onChange={this.handleChange} placeholder="请选择题目类型">
                {
                  classS.map(item => {
                    return <Option value={item.subject_id} key={item.subject_id}>{item.subject_text}</Option>
                  })
                }
              </Select>
            </div>
            <Button type="primary" onClick={this.handleSubmit}>查询</Button>
          </div>
        </div>
        <div className={styles.maxTop}>
          <div>
            <Table columns={columns} dataSource={data} size="middle" />
          </div>
        </div>
    </div>)
  }
}

export default ExamList