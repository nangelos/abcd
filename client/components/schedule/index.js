import React, {Component} from 'react'
import styled from 'styled-components'
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
                  <Square num="1" />
                </td>
                <td>
                  <Square num="2" />
                </td>
                <td>
                  <Square num="3" />
                </td>
                <td>
                  <Square num="4" />
                </td>
                <td>
                  <Square num="5" />
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </ScheduleWrapper>
    )
  }
}

export default Schedule
