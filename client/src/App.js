import React from 'react'
import {BrowserRouter as Router, Route, Link, Switch} from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import {Nav, Navbar} from 'react-bootstrap'
import SignUp from './components/SignUp'
import SignIn from './components/SignIn'
import Logout from './components/Logout'
import {connect} from 'react-redux'
import Home from './components/Home'
import Users from './components/Users'

function App(props){
  return(
    <div>
      <Navbar bg="dark" variant="dark" expand="lg">
        <Navbar.Brand href="/">Auth App</Navbar.Brand>
        <Nav className="mr-auto">
          <Nav.Link href="/signup">SignUp</Nav.Link>                                                     
          <Nav.Link href="/signin">SignIn</Nav.Link>
          <Nav.Link href="/home">Home</Nav.Link>   

          {
            (props.role==='Admin')
            &&
            <Nav.Link href="/users">All Users</Nav.Link>
          }     

          {
            (props.userId!==null)
            &&
            <Logout />
          }     
          {
            (props.email!==null)
            &&
            <p style={{color:'white',marginLeft:100,marginTop:8,fontSize:18}}>Hello {props.email.split('@')[0]}</p>
          }     
                                                    
        </Nav>
      </Navbar>

      <Router>
        <Switch>
          <Route exact path="/signup" component={SignUp} />
          <Route exact path="/signin" component={SignIn} /> 
          <Route exact path="/home" component={Home} />  
          <Route exact path="/users" component={Users} />   
        </Switch>
      </Router>

    </div>
  )

}

const mapStateToProps=(state)=>{
  return{
    email:state.email,
    userId:state.userId,
    role:state.role
  }
}

export default connect(mapStateToProps)(App)