import React from 'react'
import {connect} from 'react-redux'
import {signin} from '../actions/creators'
import {Redirect} from 'react-router-dom'
import {Alert} from 'react-bootstrap'

class SignIn extends React.Component
{
    constructor(props){
        super(props)
        this.state={
            email:'',
            password:'',
        }
    }
    onChangeEmail=(e)=>{
        this.setState({email:e.target.value})
    }
    onChangePassword=(e)=>{
        this.setState({password:e.target.value})
    }
   
    onSubmit=(e)=>{
        e.preventDefault()
        const userObj={
            email:this.state.email,
            password:this.state.password,
        }
        this.props.dispatch(signin(userObj))
    }

    render(){
        return(
            <div className="container">
                {
                    (this.props.userId!==null)
                    &&
                    <Redirect to='/home' />
                }
                {
                    (this.props.errors)
                    &&
                    <Alert variant='warning'>{this.props.errors}</Alert>
                }
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <h2 className="form-title">Sign In</h2>
                        <p style={{color:'red'}}>*required</p>
                    </div>
                    <div className="form-group">
                        <label>Email Address<sup style={{color:'red'}}>*</sup></label>
                        <input type="email" className="form-control" placeholder="email@example.com" value={this.state.email} onChange={this.onChangeEmail} required/>
                    </div>
                    <div className="form-group">
                        <label>Password<sup style={{color:'red'}}>*</sup></label>
                        <input type="password" className="form-control" placeholder="Password" value={this.state.password} onChange={this.onChangePassword} required/>
                    </div>
                    <div className="form-group">
                        <input type="submit" className="btn btn-primary" value="Login" />
                    </div>
                </form>
            </div>

        )
    }
}

const mapStateToProps=function(state){
    return{
        userId:state.userId,
        errors:state.msg
    }
}
export default connect(mapStateToProps)(SignIn)