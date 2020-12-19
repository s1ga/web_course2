import {Component} from 'react'
import classes from './App.module.css'
import Module from './Module/Module'
import Form from './Form/Form'

class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      students: [],
      editStudent: {},
      isLoading: true,
      errorMsg: ''
    }
  }

  componentDidMount() {
    fetch('http://localhost:5000/api/students', {method: 'get'})
      .then(res => res.json())
      .then(data => {
        if (typeof data === 'string') {
          this.setState({
            errorMsg: data
          })
        } else {
          this.setState({
            students: data,
            isLoading: false
          })   
        }
      }) 
  }

  editHandler = id => {
    const student = this.state.students[id - 1]
    const editValues = this.state.editStudent

    const newStudent = {
      name: editValues.name ? editValues.name : student.name,
      surname: editValues.surname ? editValues.surname : student.surname,
      age: editValues.age ? +editValues.age : student.age,
      mark: editValues.mark ? +editValues.mark : student.mark,
    }

    fetch(`http://localhost:5000/api/students/${id - 1}`, {
      method: 'put',
      body: JSON.stringify(newStudent),
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json', 
      }
    })
      .then(res => res.json())
      .then(student => {
        if (typeof student === 'string') {
          this.setState({
            errorMsg: student
          })
        } else {
          const students = [...this.state.students]
          students[id - 1] = student

          this.setState({ students })
        }
      })  
  }

  removeHandler = id => {
    fetch(`http://localhost:5000/api/students/${id-1}`, {method: 'delete'})
            .then(res => res.json())
            .then(res => {
              if (res !== 'Deleted') {
                this.setState({
                  errorMsg: res
                })
              } else {
                console.log(res)
                const students = this.state.students.filter((_, idx) => idx + 1 !== id)
                this.setState({ students })
              }
            })
  }

  addHandler = student => {
    const { name, surname, age, mark } = student

    fetch('http://localhost:5000/api/students', {
      method: 'post',
      body: JSON.stringify({name, surname, age: +age, mark: +mark}),
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json', 
      }
    })
      .then(res => res.json())
      .then(student => {
        if (typeof student === 'string') {
          this.setState({
            errorMsg: student
          })
        } else {
          const students = [...this.state.students]
          students.push(student)
  
          this.setState({ students })
        }
      })
  }

  editValues = editStudent => this.setState({ editStudent })

  getMark = () => {
    const length = this.state.students.length

    if (length) {
      const mark = this.state.students.reduce((total, item) => total += item.mark, 0) / this.state.students.length 

      return mark.toFixed(2)
    } else {
      return 0
    }
  }

  render() {
    const loaded = 
      this.state.isLoading 
        ? <p>Loading...</p>
        : <Module 
            students={this.state.students} 
            edit={this.editHandler}
            remove={this.removeHandler}
            getMark={this.getMark}
          />

    return (
      <div className={classes.App}>  
        <h1>Practical work 6</h1>

        {
          this.state.errorMsg 
            ? <h2>{ this.state.errorMsg }</h2>
            : loaded
        }

        <Form onEdit={this.editValues} onAdd={this.addHandler} />
      </div>
    ) 
  }
}

export default App

