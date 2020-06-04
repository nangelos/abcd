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
      //Need to get a studentID passed down
      const {date, studentId, weekend} = this.props
      const {absent} = this.state
      if (absent && !weekend) {
        console.log(
          `component ${date} heard that & i am ${studentId} & i am ${absent}`
        )
      }
    })
  }

  render() {
    const props = this.props
    return (
      <div>
        <CalendarSquare
          name="square"
          value={this.state.absent}
          absent={this.state.absent}
          weekend={props.weekend}
          onClick={this.changeBinary}
        >
          {props.date}
        </CalendarSquare>
      </div>
    )
  }
}

export default Square
