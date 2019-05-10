import React, { Component, Fragment } from 'react'
import ReactMarkdown from 'react-markdown'
import styles from './style.less'
import { Tag ,Divider} from 'antd'


class QuestionsDetail extends Component {
  constructor (props) {
    super(props)
    this.state = {}
  }
  
  render () {
    let questionsList=this.props.location.state.data;
    return (
      <Fragment>
        <div className={styles.bottomCon}>
          <div className={styles.leftcontent}>
            <div className={styles.titlecon}>
              <span>{questionsList.user_name}</span>
              <div />
              <h3>题目信息</h3>
              <div className={styles.color}>
                <Tag color='blue'>{questionsList.questions_type_text}</Tag>
                <Tag color='geekblue'>{questionsList.subject_text}</Tag>
                <Tag color='orange'>{questionsList.exam_name}</Tag>
              </div>
              <h3>{questionsList.title}</h3>
              <div className={styles.react_markdown}>
                <ReactMarkdown className="react-markdown" source={questionsList.questions_stem}></ReactMarkdown>
              </div>
              <Divider type="vertical" />
            </div>
          </div>
          <div className={styles.rightcontent}>
          <h3>答案信息</h3>
          <ReactMarkdown className="react-markdown" source={questionsList.questions_answer}></ReactMarkdown>
          </div>
        </div>
      </Fragment>
    )
  }
  
}

export default QuestionsDetail
