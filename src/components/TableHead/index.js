import React from 'react'

function TableHead(props) {
    return (
        <table className="table table-hover">
            <thead>

            </thead>
            <tbody>
                {props.children}
            </tbody>
        </table>
    )
}

export default TableHead
