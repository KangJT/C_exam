import React,{Component} from 'react'
import propsTypes from 'prop-types'

class DocumentTitle extends Component{
  static propsTypes = {
    title:propsTypes.string
  }

  componentDidMount(){
    document.title=this.props.title
  }

  componentWillReceiveProps(newProps){
    if(newProps.title){
      document.title=newProps.title
    }else{
      document.title='考试系统'
    }
    this.forceUpdate();
  }

  render(){
    const title=this.props.title
    return <h1 style={{
      fontSize:21,
      marginTop: 10
    }}>{title}</h1>
  }
}

export default DocumentTitle