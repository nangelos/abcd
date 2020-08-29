import React, {Component} from 'react'
import {connect} from 'react-redux'
import socket from '../../socket'
import styled from 'styled-components'
import {
  stateList,
  InfoInput,
  primaryColor,
  secondaryColor,
  InfoRow,
} from '../../constants'
import {addParentInfo} from '../../store'

const ParentWrapper = styled.div`
  width: 90%;
  background: ${secondaryColor};
  margin: 10px;
  padding: 5px;
  display: inline-block;
`

class ParentInfo extends Component {
  state = {
    parentFirst: '',
    parentLast: '',
    parentCell: '',
    parentWork: '',
    parentEmail: '',
    parentAddress: '',
    parentCity: '',
    parentState: 'AL',
    parentZip: '',
    eContactName1: '',
    eContactPhone1: '',
    eContactName2: '',
    eContactPhone2: '',
  }

  defaultState = {
    parentFirst: '',
    parentLast: '',
    parentCell: '',
    parentWork: '',
    parentEmail: '',
    parentAddress: '',
    parentCity: '',
    parentState: 'AL',
    parentZip: '',
    eContactName1: '',
    eContactPhone1: '',
    eContactName2: '',
    eContactPhone2: '',
  }

  handleTextboxChange = (evt) => {
    let {name, value} = evt.target
    this.setState({[name]: value})
  }

  handlePhoneChange = (evt) => {
    let {name, value} = evt.target
    if (value[0] && value[0] !== '(') {
      let arr = value.split('')
      arr.unshift('(')
      value = arr.join('')
    }
    if (value[3] && value[4] !== ')' && !value.includes(')')) {
      let arr = value.split('')
      arr.splice(4, 0, ') ')
      value = arr.join('')
    }
    if (value[9] && value[9] !== '-') {
      let arr = value.split('')
      arr.splice(9, 0, '-')
      value = arr.join('')
    }
    this.setState({[name]: value})
  }

  makeBlanksNull(obj) {
    if (obj.parentWork === '') {
      obj.parentWork = null
    }
    if (obj.eContactName2 === '') {
      obj.eContactName2 = null
    }
    if (obj.eContactPhone2 === '') {
      obj.eContactPhone2 = null
    }
    return obj
  }

  handleSubmit = () => {
    if (JSON.stringify(this.state) !== JSON.stringify(this.defaultState)) {
      const {createParentInfo} = this.props
      const userId = this.props.state.user.id
      this.setState({userId})
      let formatted = this.makeBlanksNull(this.state)
      createParentInfo(formatted)
    }
  }

  componentDidMount() {
    socket.on('submitClick', () => {
      this.handleSubmit()
    })
  }

  componentWillUnmount() {
    socket.off('submitClick')
  }

  render() {
    return (
      <div style={{textAlign: 'center'}}>
        <ParentWrapper>
          <form onSubmit={this.handleSubmit}>
            <InfoRow>
              <p style={{width: '120px'}}>Full Name</p>
              <InfoInput
                name="parentFirst"
                placeholder="Parent First Name"
                required
                onChange={this.handleTextboxChange}
              />
              <InfoInput
                name="parentLast"
                placeholder="Parent Last Name"
                required
                onChange={this.handleTextboxChange}
              />
            </InfoRow>
            <InfoRow>
              <p style={{width: '120px'}}>Contact Info</p>
              <InfoInput
                name="parentCell"
                placeholder="Cell Phone"
                style={{width: '180px'}}
                required
                onChange={this.handlePhoneChange}
                value={this.state.parentCell}
              />
              <InfoInput
                name="parentWork"
                placeholder="Work Phone"
                style={{width: '180px'}}
                onChange={this.handlePhoneChange}
                value={this.state.parentWork}
              />
              <InfoInput
                name="parentEmail"
                placeholder="Email Address"
                required
                onChange={this.handleTextboxChange}
              />
            </InfoRow>
            <InfoRow>
              <p style={{width: '120px'}}>Address</p>
              <InfoInput
                name="parentAddress"
                placeholder="Street Address"
                style={{width: '500px'}}
                required
                onChange={this.handleTextboxChange}
              />
            </InfoRow>
            <InfoRow style={{alignItems: 'center'}}>
              <p style={{width: '120px'}}></p>
              <InfoInput
                name="parentCity"
                placeholder="City"
                required
                onChange={this.handleTextboxChange}
              />
              <select
                name="parentState"
                onChange={this.handleTextboxChange}
                style={{fontSize: 'large', height: '30px'}}
              >
                {stateList.map((st, i) => {
                  return (
                    <option key={i} value={st}>
                      {st}
                    </option>
                  )
                })}
              </select>
              <InfoInput
                name="parentZip"
                placeholder="Zip Code"
                style={{width: '90px'}}
                required
                onChange={this.handleTextboxChange}
              />
            </InfoRow>
            <div style={{display: 'flex', alignItems: 'center'}}>
              <div style={{margin: '0px'}}>
                <p style={{marginBottom: '8px', width: '120px'}}>Emergency</p>
                <p style={{marginTop: '8px'}}>Contacts</p>
              </div>
              <div style={{margin: '0px'}}>
                <InfoRow style={{margin: '0px'}}>
                  <InfoInput
                    name="eContactName1"
                    placeholder="Primary Contact"
                    onChange={this.handleTextboxChange}
                    required
                    style={{width: '400px', marginRight: '50px'}}
                  />
                  <InfoInput
                    name="eContactPhone1"
                    placeholder="Phone Number"
                    style={{width: '180px'}}
                    required
                    onChange={this.handlePhoneChange}
                    value={this.state.eContactPhone1}
                  />
                </InfoRow>
                <InfoRow style={{margin: '0px'}}>
                  <InfoInput
                    name="eContactName2"
                    placeholder="Secondary Contact"
                    style={{width: '400px', marginRight: '50px'}}
                    onChange={this.handleTextboxChange}
                  />
                  <InfoInput
                    name="eContactPhone2"
                    placeholder="Phone Number"
                    style={{width: '180px'}}
                    onChange={this.handlePhoneChange}
                    value={this.state.eContactPhone2}
                  />
                </InfoRow>
              </div>
            </div>
          </form>
        </ParentWrapper>
      </div>
    )
  }
}

const mapState = (state) => ({state})
const mapDispatch = (dispatch) => ({
  createParentInfo: (data) => dispatch(addParentInfo(data)),
})

export default connect(mapState, mapDispatch)(ParentInfo)
