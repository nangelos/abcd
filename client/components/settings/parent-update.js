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
import {changeParentInfo, fetchParent} from '../../store'

const ParentWrapper = styled.div`
  width: 90%;
  background: ${secondaryColor};
  margin: 10px;
  padding: 5px;
  display: inline-block;
`

class ParentUpdate extends Component {
  state = {
    parentFirst: null,
    parentLast: null,
    parentCell: null,
    parentWork: null,
    parentEmail: null,
    parentAddress: null,
    parentCity: null,
    parentState: null,
    parentZip: null,
    eContactName1: null,
    eContactPhone1: null,
    eConcactName2: null,
    eContactPhone2: null,
  }

  handleTextboxChange = (evt) => {
    let {name, value} = evt.target
    this.setState({[name]: value})
  }

  handleSubmit = () => {
    console.log(this.props)
    const {updateParentInfo} = this.props
    const filtered = this.state.filter((val) => val !== null)
    // STILL NEED TO PUT EVENT EMITTER IN SETTINGS.JS && CREATE SUBMIT BUTTON
    console.log('filtered state: ', filtered)
    // updateParentInfo(1, this.state)
  }

  componentDidMount() {
    socket.on('submitClick', () => {
      this.handleSubmit()
    })
    // NEED TO FETCH PARENT INFO, INLCUDING PASSING DOWN userId
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
  updateParentInfo: (id, data) => dispatch(changeParentInfo(id, data)),
  getParentInfo: (id) => dispatch(fetchParent(id)),
})

export default connect(mapState, mapDispatch)(ParentUpdate)
