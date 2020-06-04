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
const MonthHeader = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 20px;
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
      year: new Date().getFullYear(),
    }
  }

  studentId = 1

  prevMonth = (evt) => {
    evt.preventDefault()
    if (this.state.month !== 0) {
      this.setState((prevState) => ({month: prevState.month - 1}))
    } else {
      this.setState((prevState) => ({month: 11, year: prevState.year - 1}))
    }
  }

  nextMonth = (evt) => {
    evt.preventDefault()
    if (this.state.month !== 11) {
      this.setState((prevState) => ({month: prevState.month + 1}))
    } else {
      this.setState((prevState) => ({month: 0, year: prevState.year + 1}))
    }
  }

  handleSubmit = (evt) => {
    evt.preventDefault()
    socket.emit('submitClick', (data) => {
      console.log('submit was clicked')
      console.log(data)
    })
  }

  blankWeek = [
    {id: '00', day: '', date: ''},
    {id: '01', day: '', date: ''},
    {id: '02', day: '', date: ''},
    {id: '03', day: '', date: ''},
    {id: '04', day: '', date: ''},
    {id: '05', day: '', date: ''},
    {id: '06', day: '', date: ''},
  ]
  blankWeekFin = [
    {id: '010', day: '', date: ''},
    {id: '011', day: '', date: ''},
    {id: '021', day: '', date: ''},
    {id: '031', day: '', date: ''},
    {id: '041', day: '', date: ''},
    {id: '051', day: '', date: ''},
    {id: '061', day: '', date: ''},
  ]
  weekdays = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
  ]

  render() {
    const weekend = ['Saturday', 'Sunday']
    const {month, year} = this.state
    let cutPoint1 = 7
    try {
      cutPoint1 = this.weekdays.indexOf(calendar[month].days[0].day)
    } catch (err) {
      // console.log(err)
    }
    let fullCal = [
      ...this.blankWeek.slice(0, cutPoint1),
      ...calendar[month].days,
      ...this.blankWeekFin.slice(0, 7),
    ]
    let week1 = fullCal.slice(0, 7)
    let week2 = fullCal.slice(7, 14)
    let week3 = fullCal.slice(14, 21)
    let week4 = fullCal.slice(21, 28)
    let week5 = fullCal.slice(28, 35)
    let week6 = fullCal.slice(35, 42)
    // let allWeeks = [week1, week2, week3, week4, week5, week6]
    // if (allWeeks[5].length < 7) {
    //   allWeeks.pop()
    // }
    // console.log('allWeeks: ', allWeeks)
    // console.log('week2: ', week2)
    // console.log('week3: ', week3)
    return (
      <ScheduleWrapper>
        <div style={{textAlign: 'center'}}>
          <MonthHeader>
            <MonthButton onClick={this.prevMonth}>{'<'}</MonthButton>
            <h1
              style={{margin: '0px'}}
            >{`${calendar[month].month} ${year}`}</h1>
            <MonthButton onClick={this.nextMonth}>{'>'}</MonthButton>
          </MonthHeader>
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
                {week1.map((day) => (
                  <td key={day.id || day.date}>
                    <Square
                      date={day.date}
                      weekend={day.date === '' || weekend.includes(day.day)}
                      studentId={this.studentId}
                    />
                  </td>
                ))}
              </tr>
              <tr>
                {week2.map((day) => (
                  <td key={day.id || day.date}>
                    <Square
                      date={day.date}
                      weekend={day.date === '' || weekend.includes(day.day)}
                      studentId={this.studentId}
                    />
                  </td>
                ))}
              </tr>
              <tr>
                {week3.map((day) => (
                  <td key={day.id || day.date}>
                    <Square
                      date={day.date}
                      weekend={day.date === '' || weekend.includes(day.day)}
                      studentId={this.studentId}
                    />
                  </td>
                ))}
              </tr>
              <tr>
                {week4.map((day) => (
                  <td key={day.id || day.date}>
                    <Square
                      date={day.date}
                      weekend={day.date === '' || weekend.includes(day.day)}
                      studentId={this.studentId}
                    />
                  </td>
                ))}
              </tr>
              <tr>
                {week5.map((day) => (
                  <td key={day.id || day.date}>
                    <Square
                      date={day.date}
                      weekend={day.date === '' || weekend.includes(day.day)}
                      studentId={this.studentId}
                    />
                  </td>
                ))}
              </tr>
              <tr>
                {week6.length === 7 &&
                  week6.map((day) => (
                    <td key={day.id || day.date}>
                      <Square
                        date={day.date}
                        weekend={day.date === '' || weekend.includes(day.day)}
                        studentId={this.studentId}
                      />
                    </td>
                  ))}
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
