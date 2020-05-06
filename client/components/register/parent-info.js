import React, {Component} from 'react'
import styled from 'styled-components'
import {stateList} from '../../constants'

const Parent = styled.div`
  display: flex;
  justify-content: space-around;
  background: purple;
  width: 100%;
  margin: 10px;
  padding: 5px;
`
const InfoInput = styled.input`
  margin: 10px;
  font-size: large;
  text-align: center;
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
    eContactPhone2: ''
  }

  handleTextboxChange = evt => {
    let {name, value} = evt.target
    this.setState({[name]: value.toUpperCase()})
    console.log(this.state)
  }

  handleSubmit = evt => {
    evt.preventDefault()
    console.log(evt)
  }

  render() {
    return (
      <Parent>
        <form onSubmit={this.handleSubmit}>
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
          <InfoInput
            name="parentCell"
            placeholder="Cell Phone Number"
            onChange={this.handleTextboxChange}
          />
          <InfoInput
            name="parentWork"
            placeholder="Work Phone Number"
            onChange={this.handleTextboxChange}
          />
          <br />
          <InfoInput
            name="parentEmail"
            placeholder="Email Address"
            onChange={this.handleTextboxChange}
          />
          <InfoInput
            name="parentAddress"
            placeholder="Home Address"
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
          <h2>Emergency Contacts</h2>
          <InfoInput
            name="eContactName1"
            placeholder="First Contact"
            onChange={this.handleTextboxChange}
            style={{width: '300px'}}
          />
          <InfoInput
            name="eContactPhone1"
            placeholder="First Contact Phone"
            onChange={this.handleTextboxChange}
          />
          <br />
          <InfoInput
            name="eContactName2"
            placeholder="Second Contact"
            onChange={this.handleTextboxChange}
            style={{width: '300px'}}
          />
          <InfoInput
            name="eContactPhone2"
            placeholder="Second Contact Phone"
            onChange={this.handleTextboxChange}
          />
        </form>
      </Parent>
    )
  }
}

export default ParentInfo
