import React, {Component} from 'react'
import {connect} from 'react-redux'
import styled from 'styled-components'
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
import {fetchParentStudent} from '../../store'
import StudentInput from './student-input'

const DayButton = styled.button`
  // font-weight: ${(props) => (props.selected ? 'bold' : 'normal')};
  background: ${(props) => (props.selected ? primaryColor : 'white')};
  color: ${(props) => (props.selected ? 'white' : 'black')};
  border: ${(props) =>
    props.selected ? `5px white solid` : '2px black solid'};
  border-radius: 5px;
  font-size: large;
  font-weight: normal;
  height: 120px;
  width: 120px;
  display: flex;
  align-items: center;
  justify-content: center;
  type="submit";
  &:hover {
    cursor: pointer;
  }
`
const StudentWrapper = styled.div`
  width: 90%;
  background: ${secondaryColor};
  margin: 10px;
  padding: 5px;
  display: inline-block;
`

class StudentUpdate extends Component {
  state = {
    active: '',
  }

  handleTextboxChange = (evt) => {
    let {name, value} = evt.target
    this.setState({[name]: value})
  }

  // handleSubmit = () => {
  //   const {updateStudentInfo} = this.props
  //   const studentId = this.props.state.student[0].id
  //   const list = this.state
  //   const filtered = Object.keys(list)
  //     .filter((key) => list[key] !== null)
  //     .reduce((obj, key) => {
  //       return {
  //         ...obj,
  //         [key]: list[key],
  //       }
  //     }, {})
  //   updateStudentInfo(studentId, filtered)
  // }

  componentDidMount() {
    const {userId, getAllStudentInfo} = this.props
    getAllStudentInfo(userId)
  }

  nameSort(a, b) {
    let nameA = a.studentFirst.toUpperCase()
    let nameB = b.studentFirst.toUpperCase()
    let comparison = 0
    if (nameA > nameB) {
      comparison = 1
    } else if (nameA < nameB) {
      comparison = -1
    }
    return comparison
  }

  render() {
    let {student} = this.props.state
    let studentList = student
    return (
      <div style={{textAlign: 'center'}}>
        {studentList[0] ? (
          <StudentWrapper>
            <select
              name="active"
              style={{fontSize: 'large', height: '30px', margin: '0px'}}
              onChange={this.handleTextboxChange}
              defaultValue="Choose Student"
            >
              <option disabled hidden value="Choose Student">
                Choose Student
              </option>
              {studentList.sort(this.nameSort).map((child) => (
                <option key={child.id} value={child.studentFirst}>
                  {child.studentFirst}
                </option>
              ))}
            </select>
            {studentList
              .filter((s) => s.studentFirst === this.state.active)
              .map((child) => (
                <StudentInput key={child.id} student={child} />
              ))}
          </StudentWrapper>
        ) : (
          <h4>Loading...</h4>
        )}
      </div>
    )
  }
}

const mapState = (state) => ({state})
const mapDispatch = (dispatch) => ({
  getAllStudentInfo: (id) => dispatch(fetchParentStudent(id)),
})
export default connect(mapState, mapDispatch)(StudentUpdate)
