import React from 'react'
import classes from './Student.module.css'

export default function Student(props) {
    return (
        <tr>
            {
                props.values.map((value, index) => {
                    return (
                        <td key={index}>{value}</td>
                    )
                })
            }
            <td className={classes.action}>
                <button className={classes.edit__btn} onClick={() => props.onEdit(props.id)}>Edit</button>
                <button className={classes.remove__btn} onClick={() => props.onRemove(props.id)}>Remove</button>
            </td>
        </tr>
    )
}
