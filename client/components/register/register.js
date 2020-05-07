import React, {Component} from 'react'
import styled from 'styled-components'
import {Day} from './day'
import ParentInfo from './parent-info'
import {schoolList, gradesList, daysList} from '../../constants'

const DayButton = styled.button`
  // font-weight: ${props => (props.selected ? 'bold' : 'normal')};
  // background: ${props => (props.selected ? 'purple' : 'white')};
  height: 150px;
  width: 150px;
  border: 2px black solid;
  display: flex;
  align-items: center;
  justify-content: center;
  type="submit"
`

class Register extends Component {
  state = {
    studentFirst: '',
    studentLast: '',
    schoolName: 'West Elementary',
    grade: 'Pre-K',
    mondayRegistered: false,
    tuesdayRegistered: false,
    wednesdayRegistered: false,
    thursdayRegistered: false,
    fridayRegistered: false
  }

  handleTextboxChange = evt => {
    let {name, value} = evt.target
    this.setState({[name]: value.toUpperCase()})
    console.log(this.state)
  }

  changeBinary = evt => {
    evt.preventDefault()
    let {name, value} = evt.target
    console.log('first take, Name: ', name, ' value: ', value)
    if (value === 'false') {
      value = false
    } else {
      value = true
    }
    console.log('name: ', name, 'value: ', value)
    let newName = `${name.toLowerCase()}Registered`
    let newValue = !value
    console.log('name: ', name, 'newValue', newValue)
    // this.setState({[newName]: newValue})
    // console.log(this.state)
  }

  handleSubmit = evt => {
    evt.preventDefault()
    console.log(evt)
  }

  render() {
    return (
      <div>
        <h2>Register Your Student</h2>
        <ParentInfo />
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
            {schoolList.map((option, i) => (
              <option key={i} value={option}>
                {option}
              </option>
            ))}
          </select>
          <select name="grade" onChange={this.handleTextboxChange}>
            {gradesList.map((option, i) => (
              <option key={i} value={option}>
                {option}
              </option>
            ))}
          </select>
          <div id="days-row">
            {daysList ? (
              daysList.map(val => (
                // <div className="day-box" key={val} value={val}>
                <DayButton
                  key={val}
                  name={val}
                  value={this.state[`${val.toLowerCase()}Registered`]}
                  // selected={this.props.selected}
                  onClick={this.changeBinary}
                >
                  <h3>{val}</h3>
                </DayButton>
              ))
            ) : (
              <h8>Loading...</h8>
            )}
          </div>
          <input type="submit" value="Register" />
        </form>
      </div>
    )
  }
}

export default Register
