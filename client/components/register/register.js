import React, {Component} from 'react'
import socket from '../../socket'
import styled from 'styled-components'
import {connect} from 'react-redux'
import ParentInfo from './parent-info'
import {fetchParent, fetchParentStudent} from '../../store'
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
    this.setState((prevState) => ({numChildren: prevState.numChildren + 1}))
  }

  removeStudent = (evt) => {
    evt.preventDefault()
    this.setState((prevState) => ({numChildren: prevState.numChildren - 1}))
  }

  componentDidMount() {
    const {state} = this.props
    const {getParent, getAllStudentInfo} = this.props
    const userId = state.user.id
    getParent(userId)
    getAllStudentInfo(userId)
  }

  handleSubmit = (evt) => {
    // evt.preventDefault()
    socket.emit('submitClick', (data) => {
      console.log('submit was clicked')
      console.log(data)
    })
  }

  render() {
    const {user, parent, student} = this.props.state
    let studentString
    if (student.length) {
      studentString = student.map((n) => n.studentFirst).join(' & ')
    }
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
        {parent[0] ? (
          <div style={{width: '90%', display: 'inline-block'}}>
            <h2>Parent Information</h2>
            <div style={{display: 'flex', justifyContent: 'space-between'}}>
              <h3>{`Name: ${parent[0].parentFirst} ${parent[0].parentLast}`}</h3>
              <h3>{`Phone: ${parent[0].parentCell}`}</h3>
              <h3>{`Email: ${parent[0].parentEmail}`}</h3>
            </div>
            <h4 style={{textAlign: 'left', margin: '0px'}}>
              *Visit Settings to Update Information
            </h4>
          </div>
        ) : (
          <ParentInfo />
        )}
        {student[0] ? (
          <div style={{width: '90%', display: 'inline-block'}}>
            <h2>Student Information</h2>
            <div style={{justifyContent: 'space-between'}}>
              <h3>{`You have ${student.length} ${
                student.length > 1 ? 'Students' : 'Student'
              } Currently Registered: ${studentString}.`}</h3>
              <h4 style={{margin: '0px', textAlign: 'left'}}>
                *Register Additional Students Below, or Visit Settings to Update
                Information.
              </h4>
            </div>
          </div>
        ) : (
          ''
        )}
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
          onClick={this.handleSubmit}
        />
      </div>
    )
  }
}

const mapState = (state) => ({state})
const mapDispatch = (dispatch) => ({
  getParent: (id) => dispatch(fetchParent(id)),
  getAllStudentInfo: (id) => dispatch(fetchParentStudent(id)),
})
export default connect(mapState, mapDispatch)(Register)
