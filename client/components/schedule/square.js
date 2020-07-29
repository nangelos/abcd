import React, {Component} from 'react'
import {connect} from 'react-redux'
import styled from 'styled-components'
import socket from '../../socket'
import {primaryColor, secondaryColor} from '../../constants'
import {addAbsence, fetchStudentAbsences} from '../../store'

const CalendarSquare = styled.button`
  type: submit;
  background: ${(p) =>
    p.weekend ? 'gray' : p.absent ? primaryColor : 'white'};
  color: ${(p) => (p.weekend ? 'black' : p.absent ? 'white' : 'black')};
  font-weight: ${(p) => (p.weekend ? 'normal' : p.absent ? 'bold' : 'normal')};
  padding: 10px;
  height: 80px;
  width: 100px;
  margin: 0px;
  border: 2px solid black;
  &:hover {
    ${(p) => (p.weekend ? '' : 'cursor: pointer')}
  }
  flex-flow: column;
  text-align: -webkit-right;
  font-size: large;
  top: 10px;
  display: flex;
  flex-direction: column;
  align-items: normal;
`

class Square extends Component {
  state = {absent: false, dirty: false}

  changeBinary = (evt) => {
    evt.preventDefault()
    const {weekend} = this.props
    if (!weekend) {
      this.setState((prevState) => ({absent: !prevState.absent, dirty: true}))
    }
  }

  componentDidMount() {
    socket.on('submitClick', () => {
      const {date, student, weekend, month, year, createAbsence} = this.props
      const {absent} = this.state
      const data = {
        studentFirst: student.studentFirst,
        studentLast: student.studentLast,
        year,
        month,
        date,
        absent,
        studentId: student.id,
      }
      if (absent && !weekend && student) {
        createAbsence(data)
      }
    })
  }

  componentWillUnmount() {
    socket.off('submitClick')
  }

  fakeDate = {
    studentId: 1,
    year: 2020,
    month: 'July',
    date: 30,
  }
  checkAbsent = (data, props) => {
    const {student, month, date, year} = props
    if (
      data.studentId === student.id &&
      data.year === year &&
      data.month === month &&
      data.date === date
    ) {
      console.log(data.date, ' : ', date)
      return true
    }
  }

  render() {
    const props = this.props
    const {dirty} = this.state
    this.checkAbsent(this.fakeDate, props)
    return (
      <div>
        <CalendarSquare
          name="square"
          value={`${props.month} ${props.date}`}
          // absent={props.absent || this.state.absent}
          absent={
            (!dirty && this.checkAbsent(this.fakeDate, props)) ||
            this.state.absent
          }
          weekend={props.weekend}
          student={props.student}
          onClick={this.changeBinary}
        >
          {props.date}
          <br />
          <div style={{textAlign: 'center'}}>
            <h4 style={{margin: '0px', color: 'white'}}>
              {props.weekend ? '' : 'Absent'}
            </h4>
          </div>
        </CalendarSquare>
      </div>
    )
  }
}
// const mapState = (state) => ({state})
const mapDispatch = (dispatch) => ({
  createAbsence: (info) => dispatch(addAbsence(info)),
  getStudentAbsences: (id) => dispatch(fetchStudentAbsences(id)),
})
export default connect(null, mapDispatch)(Square)
