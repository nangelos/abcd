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

const DayButton = styled.button`
  // font-weight: ${(props) => (props.selected ? 'bold' : 'normal')};
  background: ${(props) => (props.selected ? primaryColor : 'white')};
  color: ${(props) => (props.selected ? 'white' : 'black')};
  border: ${(props) =>
    props.selected ? `5px black solid` : '2px black solid'};
  font-size: x-large;
  font-weight: normal;
  height: 155px;
  width: 155px;
  display: flex;
  align-items: center;
  justify-content: center;
  type="submit"
`
const StudentWrapper = styled.div`
  width: 90%;
  background: ${secondaryColor};
  margin: 10px;
  padding: 5px;
  display: inline-block;
`

class Register extends Component {
  state = {
    studentFirst: '',
    studentLast: '',
    schoolName: 'West Elementary',
    grade: 'Pre-K',
    teacherName: '',
    mondayRegistered: false,
    tuesdayRegistered: false,
    wednesdayRegistered: false,
    thursdayRegistered: false,
    fridayRegistered: false,
    additionalInfo: '',
  }

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
        <h2 style={{textAlign: 'center'}}>Student Information</h2>
        <StudentWrapper>
          <form onSubmit={this.handleSubmit}>
            <InfoRow>
              <p style={{width: '120px'}}>Full Name</p>
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
            </InfoRow>
            <InfoRow>
              <p style={{width: '120px'}}>School Info</p>
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
              <InfoInput
                name="teacherName"
                placeholder="Teacher's Name"
                onChange={this.handleTextboxChange}
              />
            </InfoRow>
            <InfoRow>
              <p style={{width: '120px'}}>Addtional Info</p>
              <textarea
                name="additionalInfo"
                onChange={this.handleTextboxChange}
                placeholder={infoString}
                style={{
                  width: '400px',
                  height: '150px',
                  margin: '5px',
                  fontSize: 'medium',
                }}
              ></textarea>
            </InfoRow>
            <h3 style={{textAlign: 'center'}}>Select Days for Registration</h3>
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
          </form>
        </StudentWrapper>
        <br></br>
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
