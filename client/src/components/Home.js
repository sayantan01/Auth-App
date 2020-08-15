import React from 'react'
import { connect } from 'react-redux'
import {Redirect} from 'react-router-dom'

class Home extends React.Component{
    constructor(props)
    {
        super(props)
        this.state={
            text:''
        }
    }
    handleGreen=(e)=>{
        if(this.props.role==='Admin')
            this.setState({text:"Green"})
    }
    handleRed=(e)=>{
        if(this.props.role==='Admin')
            this.setState({text:"Red"})
    }
    render(){
    return(
        <center>
        <div className="container" style={{margin:50,backgroundColor:'black'}}>
            {
                (this.props.userId===null)
                &&
                <Redirect to='/signin' />
            }
            <h2 style={{color:'blue',padding:10}}>Welcome to Home Page!!</h2>
            <button className='btn btn-success' onClick={this.handleGreen} style={{margin:50}}>Green Button</button>
            {
                (this.props.role==='Admin')
                &&
                <button className='btn btn-danger' onClick={this.handleRed}>Red Button</button>
            } 
            <center style={{padding:10}}>
            <h2 style={this.state.text==='Green'?{color:'green'}:{color:'red'}}>{this.state.text}</h2>
            </center>
        </div>
        </center>
    )}
}

const mapStateToProps=function(state){
    return{
        userId:state.userId,
        role:state.role
    }
}

export default connect(mapStateToProps)(Home)