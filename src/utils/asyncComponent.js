import React, { Component } from 'react'

const asyncComponent = (LoadComponent) => {
  return class AsyncComponent extends Component {
    state = {
      component: null,
      load: false
    }

    componentDidMount () {
      if(!this.state.component) {
        LoadComponent().then((res) => {
          const component =  res.default
          this.setState({
            component: component,
            load: true
          })
        })
      }
    }

    render () {
      const LoadComponent = this.state.component
      const load = this.state.load
      return (
        <div>
          {load ? '' : '正在加载'}
          {LoadComponent ? <LoadComponent {...this.props} /> : null}
        </div>
      )
    }
  }
}

export default asyncComponent
