import React, {Component} from 'react'
import styled from 'styled-components'
import {
  stateList,
  InfoInput,
  primaryColor,
  secondaryColor,
} from '../../constants'

const Parent = styled.div`
  background: ${secondaryColor};
  width: 100%;
  margin: 10px;
  padding: 5px;
`
const InfoRow = styled.div`
  display: flex;
  justify-content: space-around;
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
      <div>
        <h2 style={{textAlign: 'center'}}>Parent Information</h2>
        <Parent>
          <form onSubmit={this.handleSubmit}>
            <InfoRow>
              <InfoInput
                name="parentFirst"
                placeholder="Parent First Name"
                style={{width: '300px'}}
                onChange={this.handleTextboxChange}
              />
              <InfoInput
                name="parentLast"
                placeholder="Parent Last Name"
                style={{width: '300px'}}
                onChange={this.handleTextboxChange}
              />
              <InfoInput
                name="parentCell"
                placeholder="Cell Phone"
                style={{width: '150px'}}
                onChange={this.handleTextboxChange}
              />
              <InfoInput
                name="parentWork"
                placeholder="Work Phone"
                style={{width: '150px'}}
                onChange={this.handleTextboxChange}
              />
            </InfoRow>
            <InfoRow>
              <InfoInput
                name="parentEmail"
                placeholder="Email Address"
                style={{width: '300px'}}
                onChange={this.handleTextboxChange}
              />
              <InfoInput
                name="parentAddress"
                placeholder="Home Address"
                style={{width: '400px'}}
                onChange={this.handleTextboxChange}
              />
              <InfoInput
                name="parentCity"
                placeholder="City"
                onChange={this.handleTextboxChange}
              />
              <select
                name="parentState"
                onChange={this.handleTextboxChange}
                style={{fontSize: 'large'}}
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
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                margin: '0em 1em',
              }}
            >
              <div>
                <h2>Emergency Contacts</h2>
              </div>
              <div style={{margin: '0em 1em'}}>
                <InfoRow style={{justifyContent: 'center'}}>
                  <InfoInput
                    name="eContactName1"
                    placeholder="Primary Contact"
                    onChange={this.handleTextboxChange}
                    style={{width: '400px'}}
                  />
                  <InfoInput
                    name="eContactPhone1"
                    placeholder="Phone Number"
                    style={{width: '150px'}}
                    onChange={this.handleTextboxChange}
                  />
                </InfoRow>
                <InfoRow style={{justifyContent: 'center'}}>
                  <InfoInput
                    name="eContactName2"
                    placeholder="Secondary Contact"
                    style={{width: '400px'}}
                    onChange={this.handleTextboxChange}
                  />
                  <InfoInput
                    name="eContactPhone2"
                    placeholder="Phone Number"
                    style={{width: '150px'}}
                    onChange={this.handleTextboxChange}
                  />
                </InfoRow>
              </div>
            </div>
          </form>
        </Parent>
      </div>
    )
  }
}

export default ParentInfo
