import React, {Component} from 'react'
import styled from 'styled-components'
import socket from '../../socket'
import {primaryColor, secondaryColor} from '../../constants'

const CalendarSquare = styled.button`
  type: submit;
  background: ${(p) => (p.absent ? primaryColor : 'white')};
  color: ${(p) => (p.absent ? 'white' : 'black')};
  font-weight: ${(p) => (p.absent ? 'bold' : 'normal')};
  padding: 10px;
  height: 155px;
  width: 155px;
  margin: 0px;
  border: 2px solid black;
  &:hover {
    cursor: pointer;
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
    this.setState((prevState) => ({absent: !prevState.absent}))
  }

  componentDidMount() {
    socket.on('submitClick', () => {
      //Need to get a studentID passed down
      const {num, studentId} = this.props
      const {absent} = this.state
      console.log(
        `component ${num} heard that & i am ${studentId} & i am ${absent}`
      )
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
          onClick={this.changeBinary}
        >
          {props.num}
        </CalendarSquare>
      </div>
    )
  }
}

export default Square
