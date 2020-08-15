import React from 'react'
import axios from 'axios'
import Row from './Row'
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'

class Users extends React.Component{
    constructor(props){
        super(props)
        this.state={array:[]}
    }
    componentDidMount(){
        axios('/api/get')
            .then((res)=>{
                this.setState({array:res.data})
            })
            .catch((err)=>console.log(err))
    }
    
    renderRow(){
        return this.state.array.map((item,i)=>{
            return(<Row key={i} id={i+1} email={item.email} role={item.Role.role} />)
        })

    }

    render(){
        return(
            <div className="container" style={{padding:10}}>
            {
                (this.props.role!=='Admin')
                &&
                <Redirect to='/home' />
            }
                <div>
                    <h2>Users List</h2>
                    <p style={{color:'red'}}>* To change a user's role, click on the appropriate radio button and then click 'Change Role' button</p>
                </div>
                <table className="table table-dark table-striped">
                    <thead>
                        <tr>
                            <td>Sl No</td>
                            <td>email</td>
                            <td>role</td>
                        </tr>
                    </thead>
                    <tbody>
                        {this.renderRow()}
                    </tbody>
                </table>
            </div>
        )
    }

}

const mapStateToProps=(state)=>{
  return{
    role:state.role
  }
}

export default connect(mapStateToProps)(Users)