import React, {Component} from 'react'
import styled from 'styled-components'
import {primaryColor, secondaryColor} from '../../constants'

const CalendarSquare = styled.button`
  type: submit;
  background: ${(p) => (p.absent ? secondaryColor : 'white')};
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
  state = {}

  render() {
    const props = this.props
    return (
      <div>
        <CalendarSquare>{props.num}</CalendarSquare>
      </div>
    )
  }
}

export default Square
