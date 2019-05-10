import React, {Component, Fragment} from 'react'
import {Button} from 'antd'
import styles from './style.less'

class ExamHead extends Component {
  constructor(props) {
    super(props)
    this.state = {
      userName: props.userName,
      examData: props.examData
    }
  }
  render() {
    return (
      <Fragment>
        {
          console.log()
        }
        <Button className={styles.addBtn}>添加新题</Button>
        <p className={styles.examTitle}>考试时间</p>
        <p>考试时间：1小时30分钟 监考人：刘于 开始考试时间：2018.9.10 10:00 阅卷人：刘于</p>
      </Fragment>
    )
  }
}

export default ExamHead
