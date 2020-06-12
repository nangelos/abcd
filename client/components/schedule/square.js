import React, {Component} from 'react'
import styled from 'styled-components'
import socket from '../../socket'
import {primaryColor, secondaryColor} from '../../constants'

const CalendarSquare = styled.button`
  type: submit;
  background: ${(p) =>
    p.weekend ? 'gray' : p.absent ? primaryColor : 'white'};
  color: ${(p) => (p.absent ? 'white' : 'black')};
  font-weight: ${(p) => (p.absent ? 'bold' : 'normal')};
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
  state = {absent: false}

  changeBinary = (evt) => {
    evt.preventDefault()
    const {weekend} = this.props
    if (!weekend) {
      this.setState((prevState) => ({absent: !prevState.absent}))
    }
  }

  componentDidMount() {
    socket.on('submitClick', () => {
      const {date, student, weekend, month, year} = this.props
      const {absent} = this.state
      if (absent && !weekend && student) {
        console.log(
          `${student.studentFirst} will be absent on ${month}, ${date} ${year}`
        )
      }
    })
  }

  componentWillUnmount() {
    socket.off('submitClick')
  }

  render() {
    const props = this.props
    return (
      <div>
        <CalendarSquare
          name="square"
          value={`${props.month} ${props.date}`}
          absent={props.absent || this.state.absent}
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

export default Square
