import React, {Component} from 'react'
import {connect} from 'react-redux'
import socket from '../../socket'
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
import {addStudentInfo} from '../../store'

const DayButton = styled.button`
  // font-weight: ${(props) => (props.selected ? 'bold' : 'normal')};
  background: ${(props) => (props.selected ? primaryColor : 'white')};
  color: ${(props) => (props.selected ? 'white' : 'black')};
  border: ${(props) =>
    props.selected ? `2px white solid` : '2px black solid'};
  border-radius: 5px;
  font-size: larger;
  font-weight: normal;
  height: 155px;
  width: 155px;
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

class StudentInfo extends Component {
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

  defaultState = {
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
  }

  changeBinary = (evt, name, value) => {
    evt.preventDefault()
    let newName = `${name.toLowerCase()}Registered`
    let newValue = !JSON.parse(value)
    this.setState({[newName]: newValue})
  }

  handleSubmit = () => {
    if (JSON.stringify(this.defaultState) !== JSON.stringify(this.state)) {
      const {createStudentInfo} = this.props
      let userId = this.props.state.user.id
      this.setState({userId})
      createStudentInfo(this.state)
    }
  }

  componentDidMount() {
    socket.on('submitClick', () => {
      this.handleSubmit()
    })
  }

  componentWillUnmount() {
    socket.off('submitClick')
  }

  render() {
    return (
      <div style={{textAlign: 'center'}}>
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
      </div>
    )
  }
}

const mapState = (state) => ({state})
const mapDispatch = (dispatch) => ({
  createStudentInfo: (data) => dispatch(addStudentInfo(data)),
})
// export default StudentInfo
export default connect(mapState, mapDispatch)(StudentInfo)
