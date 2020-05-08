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

const AddButton = styled.input`
  background: black;
  color: white;
  font-size: x-large;
  border-radius: 5px;
  height: 40px;
  width: 40px;
  &:hover {
    opacity: 0.5;
    border: white solid 2px;
  }
`

class Register extends Component {
  state = {
    addButtonHovered: false,
  }

  onMouseEnter = (e) => {
    this.setState({addButtonHovered: true})
  }

  onMouseLeave = (e) => {
    this.setState({addButtonHovered: false})
  }

  addStudent = (evt) => {
    evt.preventDefault()
    console.log('Add another student component')
  }

  handleSubmit = (evt) => {
    evt.preventDefault()
    console.log(evt)
  }

  render() {
    const {addButtonHovered} = this.state
    const style = addButtonHovered
      ? {}
      : {visibility: 'hidden', paddingLeft: '20px'}
    return (
      <div style={{textAlign: 'center'}}>
        <h2 style={{textAlign: 'left'}}>Register Your Student</h2>
        <ParentInfo />
        <StudentInfo />
        <div style={{textAlign: 'center'}}>
          <div style={{display: 'inline-block', width: '90%'}}>
            <div
              style={{textAlign: 'left', display: 'flex', alignItems: 'center'}}
            >
              <AddButton
                type="submit"
                value="+"
                onClick={this.addStudent}
                onMouseEnter={this.onMouseEnter}
                onMouseLeave={this.onMouseLeave}
              ></AddButton>
              <p style={style}>Click to Add Student</p>
            </div>
          </div>
        </div>
        <p />
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
