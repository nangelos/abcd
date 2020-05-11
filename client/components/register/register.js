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
    cursor: pointer;
  }
`

class Register extends Component {
  state = {
    addButtonHovered: false,
    numChildren: 1,
  }

  onMouseEnter = (e) => {
    this.setState({addButtonHovered: true})
  }

  onMouseLeave = (e) => {
    this.setState({addButtonHovered: false})
  }

  addStudent = (evt) => {
    evt.preventDefault()
    this.setState({numChildren: this.state.numChildren + 1})
    console.log(this.state)
    console.log('Add another student component')
  }

  removeStudent = (evt) => {
    evt.preventDefault()
    this.setState({numChildren: this.state.numChildren - 1})
    console.log('remove:', this.state)
  }

  handleSubmit = (arr) => {
    // evt.preventDefault()
    // console.log(evt)
    console.log(arr)
  }

  render() {
    const {addButtonHovered, numChildren} = this.state
    const style = addButtonHovered
      ? {paddingLeft: '10px'}
      : {visibility: 'hidden', paddingLeft: '10px'}
    const children = []
    for (var i = 0; i < numChildren; i++) {
      // children.push(<StudentInfo key={i} />)
      children.push(i)
    }
    return (
      <div style={{textAlign: 'center'}}>
        <h2 style={{textAlign: 'left'}}>Register Your Student</h2>
        <ParentInfo />
        {children.map((i) => (
          <StudentInfo key={i} />
        ))}
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
              <AddButton
                type="submit"
                value="-"
                style={{marginLeft: 'auto'}}
                onClick={this.removeStudent}
              ></AddButton>
            </div>
          </div>
        </div>
        <p />
        <input
          type="submit"
          value="Register"
          id="submitButton"
          style={{background: primaryColor}}
          onClick={() => this.handleSubmit(children)}
        />
      </div>
    )
  }
}

export default Register
