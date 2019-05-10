import React, { Component, Fragment } from 'react'
import { connect } from 'dva'
import { Select, Row, Col, Icon, List, Tag ,Spin } from 'antd'

import styles from './style.less'

const Option = Select.Option

@connect(state => {
  let {
    allClass,
    allExamtype,
    allQuestionstype,
    questionsList
  } = state.checkQuestions
  return {
    allClass,
    allExamtype,
    allQuestionstype,
    questionsList
  }
})
class CheckQuestions extends Component {
  constructor (props) {
    super(props)
    this.state = {
      activeId: -1,
      activeFlg: false,
      subject_id: '',
      questions_type_id: '',
      exam_id: '',
      id:'',
    }
  }
  render () {
    let { allClass, allExamtype, allQuestionstype, questionsList } = this.props
    let { activeId, activeFlg } = this.state
    return (
      <Fragment>
        <Spin size="large" />
        <div className={styles.conBottom}>
          <div className={styles.filterCon}>
            <p>课程类型：</p>
            <ul>
              <li
                onClick={this.handleAll.bind(this)}
                className={activeFlg ? styles.active : null}
              >
                all
              </li>
              {allClass &&
                allClass.map((item, index) => (
                  <li
                    key={index}
                    id={item.subject_id}
                    className={
                      activeFlg || activeId === index ? styles.active : null
                    }
                    onClick={() => this.handleActive(index, item.subject_id)}
                  >
                    {item.subject_text}
                  </li>
                ))}
            </ul>
          </div>
          <div className={styles.selectCon}>
            <Row>
              <Col span={6}>
                <span>考试类型：</span>
                <Select
                  defaultValue=''
                  style={{ width: 120 }}
                  onChange={this.handleChange.bind(this)}
                >
                  {allExamtype &&
                    allExamtype.map((item, index) => (
                      <Option
                        id={item.exam_id}
                        value={item.exam_id}
                        key={index}
                      >
                        {item.exam_name}
                      </Option>
                    ))}
                </Select>
              </Col>
              <Col span={6}>
                <span>题目类型：</span>
                <Select
                  defaultValue=''
                  style={{ width: 120 }}
                  onChange={this.handleChange2.bind(this)}
                >
                  {allQuestionstype &&
                    allQuestionstype.map((item, index) => (
                      <Option
                        id={item.questions_type_id}
                        value={item.questions_type_id}
                        key={index}
                      >
                        {item.questions_type_text}
                      </Option>
                    ))}
                </Select>
              </Col>
              <Col span={6}>
                <button
                  type='button'
                  className={styles.btn}
                  onClick={this.handleSubmit.bind(this)}
                >
                  <Icon type='search' />
                  <span>查询</span>
                </button>
              </Col>
            </Row>
          </div>
        </div>
        <div className={styles.listBottom}>
          <List
            itemLayout='horizontal'
            dataSource={questionsList}
            renderItem={item => (
              <List.Item>
                <List.Item.Meta
                  title={<a href='https://ant.design'>{item.title}</a>}
                  description={
                    <div onClick={()=>this.handleDetail(item)}>
                      <div>
                        <Tag color='blue'>{item.questions_type_text}</Tag>
                        <Tag color='geekblue'>{item.subject_text}</Tag>
                        <Tag color='orange'>{item.exam_name}</Tag>
                      </div>
                      <div>{item.user_name}</div>
                    </div>
                  }
                />
                <div onClick={()=>this.handleEdit(item)}>编辑</div>
              </List.Item>
            )}
          />
        </div>
      </Fragment>
    )
  }
  componentDidMount () {
    this.getData()
  }

  handleAll () {
    this.setState({
      activeFlg: !this.state.activeFlg,
      activeId: -1
    })
  }

  handleActive (index, item) {
    this.setState({
      activeId: index,
      subject_id: item
    })
  }

  handleChange (value) {
    this.setState({
      exam_id: value
    })
  }

  handleChange2 (value) {
    this.setState({
      questions_type_id: value
    })
  }
  handleDetail(detailCon){
    this.props.history.push({
      pathname: '/question/detail',
      state: {data: detailCon}
    })
  }
  handleEdit(editCon){
    this.props.history.push({
      pathname:'/question/edit',
      state:{data:editCon}
    })
  }
  handleSubmit () {
    this.props.dispatch({
      type: 'checkQuestions/getCheckList',
      params: {
        subject_id:this.state.subject_id ,
        questions_type_id: this.state.questions_type_id,
        exam_id: this.state.exam_id
      }
    })
  }

  getData () {
    this.props.dispatch({
      type: 'checkQuestions/getAllClass'
    })
    this.props.dispatch({
      type: 'checkQuestions/getAllExamType'
    })
    this.props.dispatch({
      type: 'checkQuestions/getQuestionsType'
    })
    this.props.dispatch({
      type: 'checkQuestions/getQuestionsList'
    })
  }
}

export default CheckQuestions
