import React, {Component} from 'react'
import {connect} from 'react-redux'
import styled from 'styled-components'
import {primaryColor, secondaryColor, InfoInput, InfoRow} from '../../constants'

class Payment extends Component {
  state = {cardHolder: '', cardNumber: '', expDate: '', cvv: '', zipCode: ''}

  handleTextboxChange = (evt) => {
    let {name, value} = evt.target
    this.setState({[name]: value})
  }

  inputChange = (evt) => {
    let {value} = evt.target
    let foo = value.split('/').join('')
    if (foo.length > 2) {
      foo = foo.match(new RegExp('.{1,2}', 'g')).join('/')
    }
    this.value = foo
    this.setState({expDate: foo})
  }

  handleSubmit = (evt) => {
    evt.preventDefault()
    console.log('button pushed')
    console.log(this.state)
  }
  render() {
    return (
      <div>
        <form>
          <InfoRow style={{justifyContent: 'space-between'}}>
            <div style={{display: 'flex', margin: '0px'}}>
              <p style={{width: '120px'}}>Name on Card</p>
              <InfoInput
                name="cardHolder"
                onChange={this.handleTextboxChange}
              />
            </div>
            <div style={{display: 'flex', margin: '0px'}}>
              <p style={{width: '120px'}}>Card Number</p>
              <InfoInput
                name="cardNumber"
                onChange={this.handleTextboxChange}
              />
            </div>
          </InfoRow>
          <InfoRow style={{justifyContent: 'space-between'}}>
            <div style={{display: 'flex', margin: '0px'}}>
              <p style={{width: '120px'}}>Expiration Date</p>
              <InfoInput
                name="expDate"
                style={{width: '100px'}}
                placeholder="MM/YY"
                pattern={new RegExp('.{1,2}', 'g')}
                onChange={this.inputChange}
              />
            </div>
            <div style={{display: 'flex', margin: '0px'}}>
              <p style={{width: '120px'}}>Security Code</p>
              <InfoInput
                name="cvv"
                style={{width: '60px'}}
                onChange={this.handleTextboxChange}
              />
            </div>
            <div style={{display: 'flex', margin: '0px'}}>
              <p style={{width: '120px'}}>Zip Code</p>
              <InfoInput
                name="zipCode"
                style={{width: '80px'}}
                onChange={this.handleTextboxChange}
              />
            </div>
          </InfoRow>
          <input
            type="submit"
            value="Register"
            id="submitButton"
            style={{background: primaryColor}}
            onClick={this.handleSubmit}
          />
        </form>
      </div>
    )
  }
}

const mapDispatch = (dispatch) => ({
  createCardData: (data) => dispatch(data),
})

export default connect(null, mapDispatch)(Payment)
