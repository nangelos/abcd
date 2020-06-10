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
    parentWork: null,
    parentEmail: '',
    parentAddress: '',
    parentCity: '',
    parentState: 'AL',
    parentZip: '',
    eContactName1: '',
    eContactPhone1: '',
    eContactName2: null,
    eContactPhone2: null,
  }

  defaultState = {
    parentFirst: '',
    parentLast: '',
    parentCell: '',
    parentWork: null,
    parentEmail: '',
    parentAddress: '',
    parentCity: '',
    parentState: 'AL',
    parentZip: '',
    eContactName1: '',
    eContactPhone1: '',
    eContactName2: null,
    eContactPhone2: null,
  }

  handleTextboxChange = (evt) => {
    let {name, value} = evt.target
    this.setState({[name]: value})
  }

  formatPhoneNbrs = (obj) => {
    const nums = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9']
    const phones = [
      'parentCell',
      'parentWork',
      'eContactPhone1',
      'eContactPhone2',
    ]
    Object.keys(obj).forEach((key) => {
      if (phones.includes(key) && obj[key] !== null) {
        let raw = obj[key]
        raw = raw.split('').filter((n) => nums.includes(n))
        raw.splice(6, 0, '-')
        raw.splice(3, 0, '-')
        let final = raw.join('')
        obj[key] = final
      }
    })
    return obj
  }

  handleSubmit = () => {
    if (JSON.stringify(this.state) === !JSON.stringify(this.defaultState)) {
      const {createParentInfo} = this.props
      let formatted = this.formatPhoneNbrs(this.state)
      createParentInfo(formatted)
    }
  }

  componentDidMount() {
    socket.on('submitClick', () => {
      this.handleSubmit()
    })
  }

  render() {
    return (
      <div style={{textAlign: 'center'}}>
        <h2>Parent Information</h2>
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
                onChange={this.handleTextboxChange}
              />
              <InfoInput
                name="parentWork"
                placeholder="Work Phone"
                style={{width: '180px'}}
                onChange={this.handleTextboxChange}
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
                    onChange={this.handleTextboxChange}
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
                    onChange={this.handleTextboxChange}
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
