import React from 'react'
import axios from 'axios'

class Roles extends React.Component{

	constructor(props)
	{
		super(props)
		this.state={prevRole:props.role,role:props.role}
	}

	handleClick=(e)=>{
		this.setState({role:e.target.value})
	}
   	handleSubmit=(e)=>{
   		e.preventDefault()
   		if(this.state.prevRole!==this.state.role)
   		{
   			axios.put('/api/put',{email:this.props.email,role:this.state.role})
   			.then((res)=>{
				   alert('Role changed successfully')
   			})
   			.catch((err)=>{
   				console.log(err)
   			})
   		}
   	}
   	render(){
   		return (
   			<form method="PUT" action="" onSubmit={this.handleSubmit}>
   				{
   					(this.props.role==='Admin')
   					&&
   					<div>
   						<input type="radio" name="role" value="Admin" onChange={this.handleClick} checked/>Admin<br />
   						<input type="radio" name="role" value="Customer" onChange={this.handleClick} />Customer
   					</div>
   				}
   				{
   					(this.props.role==='Customer')
   					&&
   					<div>
   						<input type="radio" name="role" value="Admin" onChange={this.handleClick}/>Admin<br />
   						<input type="radio" name="role" value="Customer" onChange={this.handleClick} checked/>Customer
   					</div>
   				}
   				<button type="submit" className="btn btn-primary btn-sm">Change Role</button>
   			</form>)
   		}
}
export default Roles