import React, { Component } from 'react'
import styles from './style.less'
import Exams from './components/examBox/index.js'
import {connect} from 'dva'
import ExamHead from './components/examHead/index.js'
import {Button} from 'antd'

const mapState = state => {
  let { questions } = state.exams;
  let { userInfo } = state.login;

  return {
    questions,
    userInfo
  }
}

@connect(mapState)
class addExamDefault extends Component {
  componentDidMount() {
    let getData = this.props.location.state;
    this.props.dispatch({
      type: 'exams/addNewExams',
      params: getData
    })
  }
  render() {
    let {questions,userInfo} = this.props;
    if(!questions.questions) {
      questions.questions = []
    }
    return (
      <div className={styles.addExamBox}>
        <ExamHead
          userName={userInfo.user_name}
          examData={this.props.location.state}
        />
        {
          questions.questions.map((item, index) => {
            return <Exams
              titleNum={index+1}
              examData={item}
              key={item.questions_id}
            />
          })
        }
        <div className={styles.addNewExamBox}>
          <Button
            type="primary"
            size="large"
            onClick={this.addNewExam}
          >
            创建事件
          </Button>
        </div>
      </div>
    )
  }
  addNewExam = () => {
    let {questions} = this.props;
    let questions_id = questions.questions.map(item => {
      return item.exam_id
    })
    questions_id = JSON.stringify(questions_id)
    let useData = {
      question_ids: questions.exam_exam_id,
      questions_id
    }
    this.props.dispatch({
      type: 'exams/getNewExam',
      params: useData
    })
  }
}

export default addExamDefault
