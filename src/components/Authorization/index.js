import React,{Component} from 'react'
import {Redirect} from 'dva/router'

const Authorization = (LayoutComponent) =>{
  return class NewLayoutComponent extends Component{

    get isLogin(){
      return window.localStorage.getItem('token')
    }

    render(){
      if(this.isLogin){
        return <LayoutComponent {...this.props}/>
      }else{
        return <Redirect to='/login'></Redirect>
      }
    }

  }
}

export default Authorization