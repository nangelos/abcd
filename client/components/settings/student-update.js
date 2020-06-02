import React, {Component} from 'react'
import {connect} from 'react-redux'
import styled from 'styled-components'
import {primaryColor, secondaryColor} from '../../constants'
import {fetchParentStudent} from '../../store'
import StudentInput from './student-input'

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
