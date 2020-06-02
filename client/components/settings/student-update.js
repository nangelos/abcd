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
import {changeStudentInfo, fetchStudent} from '../../store'

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
  type="submit"
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
    this.setState({[newName]: newValue})
  }

  handleSubmit = (evt) => {
    evt.preventDefault()
    const {createStudentInfo} = this.props
    createStudentInfo(this.state)
  }

  componentDidMount() {
    //Need to grab student data
    const {userId, getStudentInfo} = this.props
    getStudentInfo(userId)
  }

  render() {
    console.log(this.props.state)
    let {student} = this.props.state
    console.log(student[0])
    student = student[0]
    return (
      <div style={{textAlign: 'center'}}>
        {student ? (
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
                  value={student.schoolName}
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
              <h3 style={{textAlign: 'center'}}>
                Select Days for Registration
              </h3>
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
              <input
                type="submit"
                value="Update"
                id="submitButton"
                style={{background: primaryColor}}
              />
            </form>
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
  getStudentInfo: (id) => dispatch(fetchStudent(id)),
  updateStudentInfo: (id, data) => dispatch(changeStudentInfo(data)),
})
// export default StudentUpdate
export default connect(mapState, mapDispatch)(StudentUpdate)
