import React, {Component} from 'react'
import {schoolList} from '../constants'

class Register extends Component {
  state = {
    studentFirst: '',
    studentLast: '',
    schoolName: 'West Elementary',
    grade: 'Pre-K'
  }

  handleTextboxChange = evt => {
    let {name, value} = evt.target
    this.setState({[name]: value.toUpperCase()})
    console.log(this.state)
  }

  handleSubmit = evt => {
    evt.preventDefault()
    console.log(evt)
  }

  render() {
    return (
      <div>
        <h2>Register Your Student</h2>
        <form onSubmit={this.handleSubmit}>
          <input
            name="studentFirst"
            placeholder="Student First Name"
            onChange={this.handleTextboxChange}
          />
          <input
            name="studentLast"
            placeholder="Student Last Name"
            onChange={this.handleTextboxChange}
          />
          <select name="schoolName" onChange={this.handleTextboxChange}>
            School
            <option value="West Elementary">West Elementary</option>
            <option value="East Elementary">East Elementary</option>
            <option value="North Elementary">North Elementary </option>
            <option value="South Elementary">South Elementary </option>
          </select>
          <select name="grade" onChange={this.handleTextboxChange}>
            <option value="Pre-K">Pre-K</option>
            <option value="K">Kindergarten</option>
            <option value="First">First</option>
          </select>
          <input type="submit" value="Register" />
        </form>
      </div>
    )
  }
}

export default Register
