import React from 'react'
import Key from './TableKeys/Key'
import Student from './TableStudent/Student'
import styles from './Table.module.css'

const Table = props => {
        return (
            <React.Fragment>
                {
                    !props.students.length
                        ? <h3>There are no students</h3>
                        :
                        <table className={styles.Table}>
                            <thead>
                                <tr>
                                    {
                                        [...Object.keys(props.students[0]), 'action'].map((key, index) => {
                                            return (
                                                <Key 
                                                    key={index}
                                                    value={key}
                                                />
                                            )
                                        })
                                    }
                                </tr>
                            </thead>

                            <tbody>
                                {
                                    props.students.map((student, index) => {
                                        const values = Object.values(student)

                                        return (
                                            <Student 
                                                key={index}
                                                id={index + 1}
                                                values={values}
                                                onEdit={props.editHandler}
                                                onRemove={props.removeHandler}
                                            />
                                        )
                                    })
                                }
                            </tbody>
                        </table>
                }
            </React.Fragment>
        )
}

export default Table