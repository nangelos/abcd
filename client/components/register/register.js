import React, {Component} from 'react'
import styled from 'styled-components'
import ParentInfo from './parent-info'
import {
  schoolList,
  gradesList,
  daysList,
  primaryColor,
  secondaryColor,
  InfoInput,
  InfoRow,
  infoString,
} from '../../constants'
import StudentInfo from './student-info'

class Register extends Component {
  state = {}

  handleTextboxChange = (evt) => {
    let {name, value} = evt.target
    this.setState({[name]: value})
    console.log(this.state)
  }

  changeBinary = (evt, name, value) => {
    evt.preventDefault()
    let newName = `${name.toLowerCase()}Registered`
    let newValue = !JSON.parse(value)
    this.setState({[newName]: newValue})
  }

  handleSubmit = (evt) => {
    evt.preventDefault()
    console.log(evt)
  }

  render() {
    return (
      <div style={{textAlign: 'center'}}>
        <h2 style={{textAlign: 'left'}}>Register Your Student</h2>
        <ParentInfo />
        <StudentInfo />
        <input
          type="submit"
          value="Register"
          id="submitButton"
          style={{background: primaryColor}}
          onClick={this.handleSubmit}
        />
      </div>
    )
  }
}

export default Register
