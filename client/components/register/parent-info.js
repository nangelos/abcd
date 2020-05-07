import React, {Component} from 'react'
import styled from 'styled-components'
import {
  stateList,
  InfoInput,
  primaryColor,
  secondaryColor,
} from '../../constants'

const ParentWrapper = styled.div`
  width: 90%;
  background: rgb(225, 215, 223);
  margin: 10px;
  padding: 5px;
  display: inline-block;
`
const InfoRow = styled.div`
  display: flex;
  justify-content: flex-start;
  margin-top: 8px;
  margin-bottom: 8px;
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
    eConcactName2: '',
    eContactPhone2: '',
  }

  handleTextboxChange = (evt) => {
    let {name, value} = evt.target
    this.setState({[name]: value.toUpperCase()})
    console.log(this.state)
  }

  handleSubmit = (evt) => {
    evt.preventDefault()
    console.log(evt)
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
                onChange={this.handleTextboxChange}
              />
              <InfoInput
                name="parentLast"
                placeholder="Parent Last Name"
                onChange={this.handleTextboxChange}
              />
            </InfoRow>
            <InfoRow>
              <p style={{width: '120px'}}>Contact Info</p>
              <InfoInput
                name="parentCell"
                placeholder="Cell Phone"
                style={{width: '180px'}}
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
                onChange={this.handleTextboxChange}
              />
            </InfoRow>
            <InfoRow>
              <p style={{width: '120px'}}>Address</p>
              <InfoInput
                name="parentAddress"
                placeholder="Street Address"
                style={{width: '500px'}}
                onChange={this.handleTextboxChange}
              />
            </InfoRow>
            <InfoRow style={{alignItems: 'center'}}>
              <p style={{width: '120px'}}></p>
              <InfoInput
                name="parentCity"
                placeholder="City"
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
                    style={{width: '400px', marginRight: '50px'}}
                  />
                  <InfoInput
                    name="eContactPhone1"
                    placeholder="Phone Number"
                    style={{width: '180px'}}
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

export default ParentInfo
