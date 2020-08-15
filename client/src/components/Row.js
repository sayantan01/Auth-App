import React from 'react'
import Roles from './Roles'

function Row(props){
    return(
        <tr>
            <td>{props.id}</td>
            <td>{props.email}</td>
            <td><Roles email={props.email} role={props.role} /></td>
        </tr>
    )
}
export default Row