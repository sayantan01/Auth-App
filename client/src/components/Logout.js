import React from 'react'
import {logout} from '../actions/creators'
import {connect} from 'react-redux'
class Logout extends React.Component
{
	handleSubmit=(e)=>{
		e.preventDefault()
		this.props.dispatch(logout())
	}
    render(){
        return(
    <form method='POST' onSubmit={this.handleSubmit}>
        <button type='submit' className='btn btn-success'>Logout</button>
    </form>)
    }
}

const mapStateToProps=(state)=>{
  return{
    
  }
}

export default connect(mapStateToProps)(Logout)