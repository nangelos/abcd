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
import {changeStudentInfo} from '../../store'

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
  // margin: 10px;
  // padding: 5px;
  display: inline-block;
`

class StudentInput extends Component {
  state = {
    studentFirst: null,
    studentLast: null,
    schoolName: null,
    grade: null,
    teacherName: null,
    mondayRegistered: null,
    tuesdayRegistered: null,
    wednesdayRegistered: null,
    thursdayRegistered: null,
    fridayRegistered: null,
    additionalInfo: null,
  }

  handleTextboxChange = (evt) => {
    let {name, value} = evt.target
    this.setState({[name]: value})
  }

  changeBinary = (evt, name, value) => {
    evt.preventDefault()
    let newName = `${name.toLowerCase()}Registered`
    let newValue = !JSON.parse(value)
    // Would be nice to find a way that didn't require double click for already selected days
    this.setState({[newName]: newValue})
  }

  handleSubmit = () => {
    const {updateStudentInfo} = this.props
    const studentId = this.props.student.id
    const list = this.state
    const filtered = Object.keys(list)
      .filter((key) => list[key] !== null)
      .reduce((obj, key) => {
        return {
          ...obj,
          [key]: list[key],
        }
      }, {})
    updateStudentInfo(studentId, filtered)
  }

  render() {
    let {student} = this.props
    return (
      <div style={{textAlign: 'center'}}>
        <StudentWrapper>
          <form onSubmit={this.handleSubmit}>
            <InfoRow>
              <p style={{width: '120px'}}>Full Name</p>
              <InfoInput
                name="studentFirst"
                placeholder={student.studentFirst}
                onChange={this.handleTextboxChange}
              />
              <InfoInput
                name="studentLast"
                placeholder={student.studentLast}
                onChange={this.handleTextboxChange}
              />
            </InfoRow>
            <InfoRow>
              <p style={{width: '120px'}}>School Info</p>
              <select
                name="schoolName"
                defaultValue={student.schoolName}
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
                defaultValue={student.grade}
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
                placeholder={student.teacherName}
                onChange={this.handleTextboxChange}
              />
            </InfoRow>
            <InfoRow>
              <p style={{width: '120px'}}>Addtional Info</p>
              <textarea
                name="additionalInfo"
                onChange={this.handleTextboxChange}
                placeholder={
                  student.additionalInfo ? student.additionalInfo : infoString
                }
                style={{
                  width: '400px',
                  height: '120px',
                  margin: '5px',
                  fontSize: 'medium',
                }}
              ></textarea>
            </InfoRow>
            <h3 style={{textAlign: 'center', margin: '0px'}}>
              Update Days for Registration
            </h3>
            <div id="days-row">
              {daysList ? (
                daysList.map((val) => (
                  <DayButton
                    key={val}
                    name={val}
                    selected={
                      this.state[`${val.toLowerCase()}Registered`] === null &&
                      student[`${val.toLowerCase()}Registered`]
                        ? student[`${val.toLowerCase()}Registered`]
                        : this.state[`${val.toLowerCase()}Registered`]
                    }
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
            <input
              type="submit"
              value="Update"
              id="submitButton"
              style={{background: primaryColor}}
            />
          </form>
        </StudentWrapper>
      </div>
    )
  }
}

const mapState = (state) => ({state})
const mapDispatch = (dispatch) => ({
  updateStudentInfo: (id, data) => dispatch(changeStudentInfo(id, data)),
})
export default connect(mapState, mapDispatch)(StudentInput)
