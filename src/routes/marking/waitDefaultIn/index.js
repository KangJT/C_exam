import React, {Component} from 'react'
import styles from './style.less'
import { Slider, Row, Col, Button, Modal } from 'antd'
import { connect } from 'dva'

@connect()
class watchDefaultIn extends Component {
  state = {
    inputValue: 0,
  }

  onChange = (value) => {
    this.setState({
      inputValue: value,
    });
  }
  render() {
    const { inputValue } = this.state;
    const confirm = Modal.confirm;

    function showConfirm() {
      let that = this
      confirm({
        title: '确定提交阅卷结果?',
        content: '分数值是'+inputValue,
        onOk() {
          let useData = {
            id: that.props.location.state.studentId,
            score: {score: inputValue}
          }
          that.props.dispatch({
            type: 'getReadExamList/getOverExams',
            params: useData
          })
          that.props.history.push({
            pathname: '/marking/waitDetail',
            state: {id: that.props.location.state.id}
          })
        }
      });
    }

    return (
      <div className={styles.readExamBox}>
        <div className={styles.ExamList}>
        
        </div>
        <div className={styles.ExamNum}>
          <div className={styles.ExamBox}>
            <p className={styles.getNum}>得分：<span>{inputValue}</span></p>
            <Row>
              <Col span={12}>
                <Slider
                  min={0}
                  max={100}
                  onChange={this.onChange}
                  value={typeof inputValue === 'number' ? inputValue : 0}
                />
              </Col>
            </Row>
            <Button type="primary" onClick={showConfirm.bind(this)}>确定</Button>
          </div>
        </div>
      </div>
    )
  }
}

export default watchDefaultIn