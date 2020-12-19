import React, { Component } from 'react'
import classes from './Form.module.css'

export default class Form extends Component {
    constructor(props) {
        super(props)

        this.state = {
            name: '',
            surname: '',
            mark: '',
            age: '',
            validate: true,
            validateInfo: ''
        } 
    }

    clearInput = () => this.setState({
        name: '',
        surname: '',
        age: '',
        mark: ''
    })

    validate = student => {
        if (!student.name && !student.surname) {
            return 'Name or surname are required'
        } else if (student.age < 0) {
            return 'Age must be a positive number'
        } else if (student.mark < 0) {
            return 'Mark must be positive number'
        }

        return null
    }

    changeHandler = event => {
        this.setState({
           [event.target.id]: event.target.value
        })

        const name = event.target.id === 'name' ? event.target.value : ''
        const surname = event.target.id === 'surname' ? event.target.value : ''
        const age = event.target.id === 'age' ? event.target.value : ''
        const mark = event.target.id === 'mark' ? event.target.value : ''

        this.props.onEdit({ name, surname, age, mark })
    }

    addHandler = () => {
        const validation = this.validate(this.state)
        
        if (!validation) {
            this.setState({validate: true})

            this.props.onAdd(this.state)
            this.clearInput()
        } else {
            this.setState({
                validate: false,
                validateInfo: validation
            })
        }
    }

    render() {
        return (
            <div className={classes.form__wrapper}>
                <h3>Student form</h3>

                <div style={{marginBottom: '15px'}}>
                    <input id="name" value={this.state.name} onChange={this.changeHandler} className={classes.form__input} type="text" placeholder="Name" />
                    <input id="surname" value={this.state.surname} onChange={this.changeHandler} className={classes.form__input} type="text" placeholder="Surname" />
                    <input id="age" value={this.state.age} onChange={this.changeHandler} className={classes.form__input} type="number" placeholder="Age" />
                    <input id="mark" value={this.state.mark} onChange={this.changeHandler} className={classes.form__input} type="number" placeholder="Mark" />
                </div>

                <button className={classes.append__btn} onClick={this.addHandler}>Add</button>

                { this.state.validate ? null : <p className={classes.error}>{ this.state.validateInfo }</p> }
            </div>
        )
    }
}
