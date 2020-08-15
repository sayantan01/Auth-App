import React from 'react'
import {connect} from 'react-redux'
import {signup} from '../actions/creators'
import {Redirect} from 'react-router-dom'
import {Alert} from 'react-bootstrap'

class SignUp extends React.Component
{
    constructor(props){
        super(props)
        this.state={
            email:'',
            password:'',
            role:'Customer'
        }
    }
    onChangeEmail=(e)=>{
        this.setState({email:e.target.value})
    }
    onChangePassword=(e)=>{
        this.setState({password:e.target.value})
    }
    onChangeRole=(e)=>{
        this.setState({role:e.target.value})
    }
    onSubmit=(e)=>{
        e.preventDefault()
        const userObj={
            email:this.state.email,
            password:this.state.password,
            role:this.state.role
        }
        this.props.dispatch(signup(userObj))
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
                        <h2 className="form-title">Sign Up</h2>
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
                        <label>Role<sup style={{color:'red'}}>*</sup></label>
                        <select className="form=control" id="userrole" onChange={this.onChangeRole} required>
                            <option>Customer</option>
                            <option>Admin</option>
                        </select>
                    </div>
                   
                    <div className="form-group">
                        <input type="submit" className="btn btn-primary" value="Register" />
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
export default connect(mapStateToProps)(SignUp)