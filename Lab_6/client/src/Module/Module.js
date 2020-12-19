import React from 'react'
import Table from './Table/Table'
import Mark from './Mark/Mark'

const Module = props => {
        return (
            <div style={{marginTop: '30px'}}>
                <Table 
                    students={props.students} 
                    getEditValues={props.getEditValues}
                    removeHandler={props.remove}
                    editHandler={props.edit}
                />
                   
                <Mark mark={props.getMark} />
            </div>
        )
}

export default Module
