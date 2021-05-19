import React from 'react'

function TableBody(props) {
    return (
        <tr>
            <td><img src={props.image} alt={props.firstName}/></td>
            <td>{props.firstName}</td>
            <td>{props.lastName}</td>
            <td>{props.email}</td>
            <td>{props.dob}</td>
        </tr>
    )
}

export default TableBody
