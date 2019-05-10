import React, { Component } from 'react'
import Editor from 'for-editor'
import { Button, Input, Form, Select ,Modal} from 'antd'
import { connect } from 'dva'
import styles from './style.less'
const Option = Select.Option
const confirm = Modal.confirm;

@connect(state => {
  let { allClass, allExamtype, allQuestionstype } = state.addQuestions
  let { userInfo } = state.login
  let { getQuestionsList } = state.checkQuestions
  return {
    allClass,
    allExamtype,
    allQuestionstype,
    userInfo,
    getQuestionsList
  }
})
class AddQuestions extends Component {
  state = {
    title: '', // 标题的默认内容
    stemMd: '', // 题干的默认内容
    answerMd: '', // 答案的默认内容
    subject_id: '',
    questions_type_id: '',
    exam_id: ''
  }
  render () {
    console.log(this.props,'hhhhh')
    const { getFieldDecorator } = this.props.form
  
    let editCon=this.props.history.location.state?this.props.history.location.state.data:''
    let { title, stemMd, answerMd } = this.state
    let { allClass, allExamtype, allQuestionstype } = this.props
    return (
      <div>
        <Form layout='vertical' onSubmit={this.handleSubmit}>
          <h3>题目信息</h3>
          <Form.Item label='题干'>
            {getFieldDecorator('title',{ initialValue:editCon.title  })(
              <Input
                setfieldsvalue={title}
                className={styles.titleInput}
                size='large'
                placeholder='请输入题目标题，不超过20个字'
              />
            )}
          </Form.Item>
          <Form.Item label='题目主题'>
            {getFieldDecorator('stemMd',{ initialValue:editCon.questions_stem })(
              <Editor setfieldsvalue={stemMd} 
              />
            )}

            {/* <MdEditor editorId="questionsStem" editMd={stemMd} editorChange={mdEditor => getQuestionsStem(mdEditor)} /> */}
          </Form.Item>
          <Form.Item label='请选择考试类型：'>
            {
              getFieldDecorator('exam_id',{ initialValue: editCon.exam_id?editCon.exam_id:'周考一' })(
              <Select
                style={{ width: 120 }}
              >
                {allExamtype &&
                  allExamtype.map((item, index) => (
                    <Option id={item.exam_id} value={editCon.exam_id?editCon.exam_id:item.exam_id} key={editCon?editCon.exam_id:index}>
                      {item.exam_name}
                    </Option>
                  ))}
              </Select>
            )}
          </Form.Item>
          <Form.Item label='请选择课程类型：'>
            {getFieldDecorator('subject_id',{ initialValue: editCon.subject_id?editCon.subject_id:'javaScript上' })(
              <Select
                style={{ width: 120 }}
              >
                {allClass &&
                  allClass.map((item, index) => (
                    <Option
                      id={item.subject_id}
                      value={editCon.subject_id?editCon.subject_id:item.subject_id}
                      key={editCon?editCon.subject_id:index}
                    >
                      {item.subject_text}
                    </Option>
                  ))}
              </Select>
            )}
          </Form.Item>
          <Form.Item label='请选择题目类型：'>
            {getFieldDecorator('questions_type_id',{ initialValue:editCon.questions_type_id?editCon.questions_type_id:'简答题' })(
              <Select
                style={{ width: 120 }}
              >
                {allQuestionstype &&
                  allQuestionstype.map((item, index) => (
                    <Option
                      id={item.questions_type_id}
                      value={editCon.questions_type_id?editCon.questions_type_id:item.questions_type_id}
                      key={editCon?editCon.questions_type_id:index}
                    >
                      {item.questions_type_text}
                    </Option>
                  ))}
              </Select>
            )}
          </Form.Item>
          <h3>答案信息</h3>
          <Form.Item>
            {getFieldDecorator('answerMd',{ initialValue:editCon.questions_answer })(
              <Editor
              setfieldsvalue={answerMd}
              />
            )}

            {/* <MdEditor editorId="questionsAnswer" editMd={answerMd} editorChange={mdEditor => getQuestionsAnswer(mdEditor)} /> */}
          </Form.Item>
          <Button
            type='primary'
            size='large'
            htmlType='submit'
          >
            提交
          </Button>
        </Form>

      </div>
    )
  }

  componentDidMount () {
    this.getData()
  }

  getData () {
    this.props.dispatch({
      type: 'addQuestions/getAllClass'
    })
    this.props.dispatch({
      type: 'addQuestions/getAllExamType'
    })
    this.props.dispatch({
      type: 'addQuestions/getQuestionsType'
    })
  }

  updateQuestions () {
    this.props.dispatch({
      type: 'checkQuestions/getQuestionsList'
    })
  }

  handleSubmit= (e) =>{
    e.preventDefault();
    confirm({
      title: this.props.history.location.state?'您要修改吗？':'你确定要添加这道试题吗?',
      content: this.props.history.location.state?'确定要修改这道题吗？':'真的要添加吗？',
      okText: '确定',
      cancelText: '取消',
      onOk:()=> {
        this.props.form.validateFieldsAndScroll((err,fieldsValue) => {
          if (!err) {
            if(this.props.history.location.state){
              this.props.dispatch({
                type: 'addQuestions/getUpdate',
                body: {
                  questions_id:this.props.history.location.state.data.questions_id,
                  questions_type_id: fieldsValue.questions_type_id?fieldsValue.questions_type_id:'',
                  questions_stem: fieldsValue.stemMd?fieldsValue.stemMd:'',
                  subject_id: fieldsValue.subject_id?fieldsValue.subject_id:'',
                  exam_id: fieldsValue.exam_id?fieldsValue.exam_id:'',
                  questions_answer: fieldsValue.answerMd?fieldsValue.answerMd:'',
                  title: fieldsValue.title?fieldsValue.title:'',
                }
              })
              .then(() => {
                this.updateQuestions()
                this.setState({
                  stemMd:'',
                  answerMd:''
                })
                this.props.form.resetFields()
              })
            }else{
              this.props.dispatch({
                type: 'addQuestions/addQuestions',
                body: {
                  questions_type_id: fieldsValue.questions_type_id,
                  questions_stem: fieldsValue.stemMd,
                  subject_id: fieldsValue.subject_id,
                  exam_id: fieldsValue.exam_id,
                  user_id: this.props.userInfo.user_id,
                  questions_answer: fieldsValue.answerMd,
                  title: fieldsValue.title
                }
              })
              .then(() => {
                this.updateQuestions()
                this.setState({
                  stemMd:'',
                  answerMd:''
                })
                this.props.form.resetFields()
              })
            }
          }
        })
      },
      onCancel() {
        console.log('Cancel');
      },
    });
  }
}

export default Form.create({ name: 'time_related_controls' })(AddQuestions)
