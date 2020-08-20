import React, {Component} from 'react'
import {connect} from 'react-redux'
import styled from 'styled-components'
import {primaryColor, secondaryColor, InfoInput, InfoRow} from '../../constants'

class Payment extends Component {
  render() {
    return (
      <div>
        <h1>Hello world</h1>
        <InfoInput />
      </div>
    )
  }
}

const mapDispatch = (dispatch) => ({
  createCardData: (data) => dispatch(data),
})

export default connect(null, mapDispatch)(Payment)
