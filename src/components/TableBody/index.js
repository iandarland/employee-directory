import React from 'react'
import Moment from 'moment';

function TableBody(props) {
    return (
        <tr>
            <td><img src={props.image} alt={props.firstName}/></td>
            <td>{props.firstName}</td>
            <td>{props.lastName}</td>
            <td>{props.email}</td>
            <td>{Moment(props.dob).format('MM-DD-YYYY')}</td>
            {console.log(props.dob)}
        </tr>
    )
}

export default TableBody
