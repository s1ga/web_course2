import React from 'react'


export default function Mark(props) {
    const styles = {
        fontWeight: 'bold',
        marginTop: '30px',
        fontSize: '16px'
    }

    return (
        <div>
            <h2 style={styles}>Average mark: {props.mark()}</h2>
        </div>
    )
}
