import React from 'react'

function TableHead(props) {
    return (
        <table className="table">
            <thead>

            </thead>
            <tbody>
                {props.children}
            </tbody>
        </table>
    )
}

export default TableHead
