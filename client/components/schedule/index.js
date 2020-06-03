import React, {Component} from 'react'
import styled from 'styled-components'
import socket from '../../socket'
import {primaryColor, secondaryColor} from '../../constants'
import Square from './square'

const ScheduleWrapper = styled.div`
  width: 90%;
  background: ${secondaryColor};
  margin: 10px;
  padding: 5px;
  display: inline-block;
`
class Schedule extends Component {
  state = {}

  studentId = 1

  handleSubmit = (evt) => {
    evt.preventDefault()
    socket.emit('submitClick', (data) => {
      console.log('submit was clicked')
      console.log(data)
    })
  }

  render() {
    return (
      <ScheduleWrapper>
        <div style={{textAlign: 'center'}}>
          <h1 style={{width: '100%', background: primaryColor}}>June</h1>
          <table style={{margin: 'auto'}}>
            <tbody>
              <tr>
                <th>Monday</th>
                <th>Tuesday</th>
                <th>Wednesday</th>
                <th>Thursday</th>
                <th>Friday</th>
              </tr>
              <tr>
                <td>
                  <Square num="1" studentId={this.studentId} />
                </td>
                <td>
                  <Square num="2" studentId={this.studentId} />
                </td>
                <td>
                  <Square num="3" studentId={this.studentId} />
                </td>
                <td>
                  <Square num="4" studentId={this.studentId} />
                </td>
                <td>
                  <Square num="5" studentId={this.studentId} />
                </td>
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
