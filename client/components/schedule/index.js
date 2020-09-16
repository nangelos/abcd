import React, {Component} from 'react'
import {connect} from 'react-redux'
import styled from 'styled-components'
import socket from '../../socket'
import {
  primaryColor,
  secondaryColor,
  blankWeek,
  blankWeekFin,
  weekdays,
} from '../../constants'
import {
  defaultCalendar,
  calendar2020,
  calendar2021,
  calendar2022,
} from './calendar'
import Square from './square'
import {fetchParentStudent} from '../../store'

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
      selectedChild: {},
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

  chooseYear = (year) => {
    if (year === 2020 && calendar2020.length === 12) {
      return calendar2020
    } else if (year === 2021 && calendar2021.length === 12) {
      return calendar2021
    } else if (year === 2022 && calendar2022.length === 12) {
      return calendar2022
    } else {
      return defaultCalendar
    }
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

  componentDidMount() {
    const {user} = this.props.state
    const {getAllStudentInfo} = this.props
    getAllStudentInfo(user.id)
  }

  handleTextboxChange = (evt) => {
    const {value, name} = evt.target
    const {student} = this.props.state
    const filtered = student.filter((child) => child.studentFirst === value)[0]
    this.setState({[name]: filtered})
  }

  handleSubmit = (evt) => {
    evt.preventDefault()
    if (!this.state.selectedChild.id) {
      alert('Please select a student to update their schedule.')
    } else {
      socket.emit('submitClick', (data) => {
        // console.log('submit was clicked')
        console.log(data)
      })
    }
  }

  render() {
    const weekend = ['Saturday', 'Sunday']
    const {month, year, selectedChild} = this.state
    const {student} = this.props.state
    let calendar = this.chooseYear(year)
    let cutPoint1 = 7
    let fullCal = []
    try {
      cutPoint1 = weekdays.indexOf(calendar[month].days[0].day)
      fullCal = [
        ...blankWeek.slice(0, cutPoint1),
        ...calendar[month].days,
        ...blankWeekFin.slice(0, 7),
      ]
    } catch (err) {
      // console.log(err)
    }
    let week1 = fullCal.slice(0, 7)
    let week2 = fullCal.slice(7, 14)
    let week3 = fullCal.slice(14, 21)
    let week4 = fullCal.slice(21, 28)
    let week5 = fullCal.slice(28, 35)
    let week6 = fullCal.slice(35, 42)
    return (
      <div style={{textAlign: 'center'}}>
        <ScheduleWrapper>
          {Array.isArray(student) ? (
            <div style={{textAlign: 'center'}}>
              <select
                name="selectedChild"
                onChange={this.handleTextboxChange}
                style={{fontSize: 'large', height: '30px', marginBottom: '5px'}}
                defaultValue="Choose Student"
              >
                <option disabled hidden value="Choose Student">
                  Choose Student
                </option>
                {student.sort(this.nameSort).map((child) => (
                  <option key={child.id} value={child.studentFirst}>
                    {child.studentFirst}
                  </option>
                ))}
              </select>
              <MonthHeader>
                <MonthButton onClick={this.prevMonth}>{'<'}</MonthButton>
                <h1
                  style={{margin: '0px'}}
                >{`${calendar[month].month} ${year}`}</h1>
                <MonthButton onClick={this.nextMonth}>{'>'}</MonthButton>
              </MonthHeader>
              <div>
                {fullCal.length ? (
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
                          <td
                            key={
                              day.id || `${selectedChild}-${month}-${day.date}`
                            }
                          >
                            <Square
                              year={year}
                              month={calendar[month].month}
                              date={day.date}
                              absent={false}
                              weekend={
                                day.date === '' ||
                                weekend.includes(day.day) ||
                                new Date(
                                  `${calendar[month].month} ${day.date} ${year}`
                                ) <
                                  new Date() - 8.64e7
                              }
                              student={selectedChild}
                            />
                          </td>
                        ))}
                      </tr>
                      <tr>
                        {week2.map((day) => (
                          <td
                            key={
                              day.id || `${selectedChild}-${month}-${day.date}`
                            }
                          >
                            <Square
                              year={year}
                              month={calendar[month].month}
                              date={day.date}
                              absent={false}
                              weekend={
                                day.date === '' ||
                                weekend.includes(day.day) ||
                                new Date(
                                  `${calendar[month].month} ${day.date} ${year}`
                                ) <
                                  new Date() - 8.64e7
                              }
                              student={selectedChild}
                            />
                          </td>
                        ))}
                      </tr>
                      <tr>
                        {week3.map((day) => (
                          <td
                            key={
                              day.id || `${selectedChild}-${month}-${day.date}`
                            }
                          >
                            <Square
                              year={year}
                              month={calendar[month].month}
                              date={day.date}
                              weekend={
                                day.date === '' ||
                                weekend.includes(day.day) ||
                                new Date(
                                  `${calendar[month].month} ${day.date} ${year}`
                                ) <
                                  new Date() - 8.64e7
                              }
                              student={selectedChild}
                            />
                          </td>
                        ))}
                      </tr>
                      <tr>
                        {week4.map((day) => (
                          <td
                            key={
                              day.id || `${selectedChild}-${month}-${day.date}`
                            }
                          >
                            <Square
                              year={year}
                              month={calendar[month].month}
                              date={day.date}
                              weekend={
                                day.date === '' ||
                                weekend.includes(day.day) ||
                                new Date(
                                  `${calendar[month].month} ${day.date} ${year}`
                                ) <
                                  new Date() - 8.64e7
                              }
                              student={selectedChild}
                            />
                          </td>
                        ))}
                      </tr>
                      <tr>
                        {week5.map((day) => (
                          <td
                            key={
                              day.id || `${selectedChild}-${month}-${day.date}`
                            }
                          >
                            <Square
                              year={year}
                              month={calendar[month].month}
                              absent={true}
                              date={day.date}
                              weekend={
                                day.date === '' ||
                                weekend.includes(day.day) ||
                                new Date(
                                  `${calendar[month].month} ${day.date} ${year}`
                                ) <
                                  new Date() - 8.64e7
                              }
                              student={selectedChild}
                            />
                          </td>
                        ))}
                      </tr>
                      <tr>
                        {week6.length === 7 &&
                          week6[0].id !== '010' &&
                          week6.map((day) => (
                            <td
                              key={
                                day.id ||
                                `${selectedChild}-${month}-${day.date}`
                              }
                            >
                              <Square
                                year={year}
                                month={calendar[month].month}
                                date={day.date}
                                weekend={
                                  day.date === '' ||
                                  weekend.includes(day.day) ||
                                  new Date(
                                    `${calendar[month].month} ${day.date} ${year}`
                                  ) <
                                    new Date() - 8.64e7
                                }
                                student={selectedChild}
                              />
                            </td>
                          ))}
                      </tr>
                    </tbody>
                  </table>
                ) : (
                  <h1>Month is Unavailable</h1>
                )}
                <input
                  id="submitButton"
                  style={{background: primaryColor}}
                  type="submit"
                  value="Update"
                  onClick={this.handleSubmit}
                />
              </div>
            </div>
          ) : (
            <h4>Loading...</h4>
          )}
        </ScheduleWrapper>
      </div>
    )
  }
}

const mapState = (state) => ({state})
const mapDispatch = (dispatch) => ({
  getAllStudentInfo: (id) => dispatch(fetchParentStudent(id)),
})
export default connect(mapState, mapDispatch)(Schedule)
