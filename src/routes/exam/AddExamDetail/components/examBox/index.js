import React, {Component} from 'react'
import styles from './style.less'

class Exams extends Component {
  constructor(props) {
    super(props)
    this.state = {
      examData: props.examData,
      titleNum: props.titleNum
    }
  }
  render() {
    let needData = this.state.examData;
    let titleNum = this.state.titleNum
    return (
      <div className={styles.ExamsBox}>
        <div className={styles.examTitle}>
          <p className={styles.examType}>{titleNum+'. '}{needData.title}</p>
          <span className={styles.delButton}>删除</span>
        </div>
        <pre>
          <code>{needData.questions_stem}</code>
        </pre>
      </div>
    )
  }
}

export default Exams
