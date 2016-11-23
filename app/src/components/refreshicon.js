import React, { Component } from 'react';
import RefreshIndicator from 'material-ui/RefreshIndicator';

const style = {
  container: {
    position: 'relative',
    cursor: 'pointer',
    marginTop: 10
  },
  refresh: {
    display: 'inline-block',
    position: 'relative',
  },
};

class RefreshIndicatorExampleSimple extends Component{
  constructor(props){
    super(props)
    this.state = {
      status : 'ready'
    }
  }
  render(){
    return(
      <div style={style.container}>
        <RefreshIndicator
          percentage={100}
          size={40}
          left={65}
          top={0}
          status={this.state.status}
          style={style.refresh}
          onClick={this.handleRefreshBtnClick.bind(this)}
        />
      </div>
    )
  }

  componentWillReceiveProps(){
    this.setState({status:'ready'})
  }

  handleRefreshBtnClick(){
    this.setState({status:'loading'})
    this.props.refreshData()
  }
}

export default RefreshIndicatorExampleSimple;