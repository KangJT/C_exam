import React, { Component,Fragment } from 'react'
import { Table,Modal,Input,Popconfirm,Icon} from 'antd';
import {connect} from 'dva';

import styles from './style.less'

@connect((state)=>{
  const {typelist}=state.questionsType
  return {
    typelist
  }
})


class QuestionsType  extends Component {
  constructor (props) {
    super(props)
    this.state={
      visible: false,
      centered:true,
      val:'',
      sort:0,
      id:'',
    }
    this.columns = [{
      title: '类型ID',
      dataIndex: 'questions_type_id'
    }, {
      title: '类型名称',
      dataIndex: 'questions_type_text'
    }, {
      title: '操作',
      dataIndex: 'address',
      render: (text,record,index)=> (
        <span>
             <Popconfirm title="删除不可恢复，你确定要删除吗?" onConfirm={() => this.onDelete(record.questions_type_id)}>
                <a title="用户删除"  className="mgl10">
                <Icon type="delete"/></a>
             </Popconfirm>
        </span>
      ) 
    }];
  }
  render(){
    let {typelist} =this.props;
    let {visible}=this.state;
    return <Fragment>
      <div className={styles.conBottom}>
        <div className={styles.con}>
          <button type="button" className={styles.btn} onClick={this.handleType}>+添加类型</button>
          <Table 
          columns={this.columns} 
          dataSource={typelist} 
          size="large" />
          {visible?<Modal
          title="创建新类型"
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          cancelText="取消"
          okText="确定"
          centered={this.state.centered}
          rowKey="key"
        >
          <Input placeholder="请输入类型名称" onChange={v=>{this.handlechange(v)}}/>
        </Modal>:null}
        </div>
      </div>
    </Fragment>
  }


  createRandomId=()=> {
    return (Math.random() * 10000000).toString(4).substr(0, 4) + '_' + (new Date()).getTime() + '_' + Math.random().toString().substr(2, 5);
  }

  componentDidMount(){
    this.getData()
  }

  getData(){
    this.props.dispatch({type:'questionsType/getQuestionsType'})
  }

  handleType=()=>{
    this.setState({
      visible: true,
    });
  }
  createRandomId=()=> {
    return (Math.random() * 10000000).toString(4).substr(0, 4) + '_' + (new Date()).getTime() + '_' + Math.random().toString().substr(2, 5);
  }
  handleOk = (e) => {
    this.props.dispatch({
      type:'questionsType/addQuestionsType',
      params:{
        'text':this.state.val,
        'sort':this.createRandomId()
    }})
    this.setState({
      visible: false,
    });
    this.getData()
  }

  handleCancel = (e) => {
    this.setState({
      visible: false,
    });
  }

  handlechange=(val)=>{
    this.setState({
      val:val.target.value
    })
  }
  
  onDelete = (id) => {
    console.log(id, '删除')
    this.props.dispatch({
      type:'questionsType/getDelte',
      body:{
        'id': id
    }})
    this.getData()
}
}

export default QuestionsType