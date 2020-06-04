import React, {Component} from 'react'
import styled from 'styled-components'
import socket from '../../socket'
import {primaryColor, secondaryColor} from '../../constants'
import {calendar} from './calendar'
import Square from './square'

const ScheduleWrapper = styled.div`
  width: 90%;
  background: ${secondaryColor};
  margin: 10px;
  padding: 5px;
  display: inline-block;
`
const MonthRow = styled.div`
  display: flex;
  justify-content: space-around;
  padding: 20px 0px;
  width: '100%';
  background: ${primaryColor};
`

const MonthButton = styled.button`
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

class Schedule extends Component {
  constructor(props) {
    super(props)
    this.state = {
      month: new Date().getMonth(),
    }
  }

  studentId = 1

  prevMonth = (evt) => {
    evt.preventDefault()
    this.setState((prevState) => ({month: prevState.month - 1}))
  }

  nextMonth = (evt) => {
    evt.preventDefault()
    this.setState((prevState) => ({month: prevState.month + 1}))
    console.log(this.state)
  }

  handleSubmit = (evt) => {
    evt.preventDefault()
    socket.emit('submitClick', (data) => {
      console.log('submit was clicked')
      console.log(data)
    })
  }

  render() {
    const weekend = ['Saturday', 'Sunday']
    const {month} = this.state
    console.log(calendar)
    return (
      <ScheduleWrapper>
        <div style={{textAlign: 'center'}}>
          <MonthRow>
            <MonthButton onClick={this.prevMonth}>{'<'}</MonthButton>
            <h1 style={{margin: '0px'}}>{calendar[month].month}</h1>
            <MonthButton onClick={this.nextMonth}>{'>'}</MonthButton>
          </MonthRow>
          <table style={{margin: 'auto'}}>
            <tbody>
              <tr style={{margin: '10px 0px'}}>
                <th>Sunday</th>
                <th>Monday</th>
                <th>Tuesday</th>
                <th>Wednesday</th>
                <th>Thursday</th>
                <th>Friday</th>
                <th>Saturday</th>
              </tr>
              <tr>
                <td>
                  <Square date="" weekend={true} />
                </td>
                {calendar[this.state.month].days.map((day) => (
                  <td key={day.date}>
                    <Square
                      date={day.date}
                      weekend={weekend.includes(day.day)}
                      studentId={this.studentId}
                    />
                  </td>
                ))}
                {/* <td>
                  <Square date="2" weekend={false} studentId={this.studentId} />
                </td>
                <td>
                  <Square date="3" weekend={false} studentId={this.studentId} />
                </td>
                <td>
                  <Square date="4" weekend={false} studentId={this.studentId} />
                </td>
                <td>
                  <Square date="5" weekend={false} studentId={this.studentId} />
                </td>
                <td>
                  <Square date="6" weekend={true} studentId={this.studentId} />
                </td> */}
              </tr>
            </tbody>
          </table>
          <input
            id="submitButton"
            style={{background: primaryColor}}
            type="submit"
            value="Update"
            onClick={this.handleSubmit}
          />
        </div>
      </ScheduleWrapper>
    )
  }
}

export default Schedule
