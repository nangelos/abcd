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
} from '../../constants'

const DayButton = styled.button`
  // font-weight: ${(props) => (props.selected ? 'bold' : 'normal')};
  background: ${(props) => (props.selected ? primaryColor : 'white')};
  color: ${(props) => (props.selected ? 'white' : 'black')};
  border: ${(props) =>
    props.selected ? `5px ${secondaryColor} solid` : '2px black solid'};
  font-size: x-large;
  font-weight: normal;
  height: 160px;
  width: 160px;
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
    fridayRegistered: false,
  }

  handleTextboxChange = (evt) => {
    let {name, value} = evt.target
    this.setState({[name]: value.toUpperCase()})
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
      <div>
        <h2>Register Your Student</h2>
        <ParentInfo />
        <h2 style={{textAlign: 'center'}}>Student Information</h2>
        <form onSubmit={this.handleSubmit}>
          <div style={{display: 'flex', justifyContent: 'space-around'}}>
            <InfoInput
              name="studentFirst"
              placeholder="Student First Name"
              onChange={this.handleTextboxChange}
            />
            <InfoInput
              name="studentLast"
              placeholder="Student Last Name"
              onChange={this.handleTextboxChange}
            />
            <select
              name="schoolName"
              style={{fontSize: 'large', height: '30px', margin: '10px'}}
              onChange={this.handleTextboxChange}
            >
              {schoolList.map((option, i) => (
                <option key={i} value={option}>
                  {option}
                </option>
              ))}
            </select>
            <select
              name="grade"
              style={{fontSize: 'large', height: '30px', margin: '10px'}}
              onChange={this.handleTextboxChange}
            >
              {gradesList.map((option, i) => (
                <option key={i} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>
          <h2 style={{textAlign: 'center'}}>Select Days for Registration</h2>
          <div id="days-row">
            {daysList ? (
              daysList.map((val) => (
                <DayButton
                  key={val}
                  name={val}
                  selected={this.state[`${val.toLowerCase()}Registered`]}
                  onClick={(evt) =>
                    this.changeBinary(
                      evt,
                      val,
                      this.state[`${val.toLowerCase()}Registered`]
                    )
                  }
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
