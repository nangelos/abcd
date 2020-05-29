import React, {Component} from 'react'
import {connect} from 'react-redux'
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
    const {updateParentInfo, userId} = this.props
    const list = this.state
    const formatted = this.formatPhoneNbrs(list)
    const filtered = Object.keys(formatted)
      .filter((key) => formatted[key] !== null)
      .reduce((obj, key) => {
        return {
          ...obj,
          [key]: formatted[key],
        }
      }, {})
    updateParentInfo(userId, filtered)
  }

  componentDidMount() {
    const {userId, getParentInfo} = this.props
    getParentInfo(userId)
  }

  render() {
    const parent = this.props.state.parent[0]
    return (
      <div style={{textAlign: 'center'}}>
        {parent ? (
          <ParentWrapper>
            <form onSubmit={this.handleSubmit}>
              <InfoRow>
                <p style={{width: '120px'}}>Full Name</p>
                <InfoInput
                  name="parentFirst"
                  placeholder={parent.parentFirst}
                  onChange={this.handleTextboxChange}
                />
                <InfoInput
                  name="parentLast"
                  placeholder={parent.parentLast}
                  onChange={this.handleTextboxChange}
                />
              </InfoRow>
              <InfoRow>
                <p style={{width: '120px'}}>Contact Info</p>
                <InfoInput
                  name="parentCell"
                  placeholder={parent.parentCell}
                  style={{width: '180px'}}
                  onChange={this.handleTextboxChange}
                />
                <InfoInput
                  name="parentWork"
                  placeholder={
                    parent.parentWork ? parent.parentWork : 'Work Phone'
                  }
                  style={{width: '180px'}}
                  onChange={this.handleTextboxChange}
                />
                <InfoInput
                  name="parentEmail"
                  placeholder={
                    parent.parentEmail ? parent.parentEmail : 'Email Address'
                  }
                  onChange={this.handleTextboxChange}
                />
              </InfoRow>
              <InfoRow>
                <p style={{width: '120px'}}>Address</p>
                <InfoInput
                  name="parentAddress"
                  placeholder={
                    parent.parentAddress
                      ? parent.parentAddress
                      : 'Street Address'
                  }
                  style={{width: '500px'}}
                  onChange={this.handleTextboxChange}
                />
              </InfoRow>
              <InfoRow style={{alignItems: 'center'}}>
                <p style={{width: '120px'}}></p>
                <InfoInput
                  name="parentCity"
                  placeholder={parent.parentCity ? parent.parentCity : 'City'}
                  onChange={this.handleTextboxChange}
                />
                <select
                  name="parentState"
                  onChange={this.handleTextboxChange}
                  value={parent.parentState}
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
                  placeholder={parent.parentZip}
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
                      placeholder={parent.eContactName1}
                      onChange={this.handleTextboxChange}
                      style={{width: '400px', marginRight: '50px'}}
                    />
                    <InfoInput
                      name="eContactPhone1"
                      placeholder={parent.eContactPhone1}
                      style={{width: '180px'}}
                      onChange={this.handleTextboxChange}
                    />
                  </InfoRow>
                  <InfoRow style={{margin: '0px'}}>
                    <InfoInput
                      name="eContactName2"
                      placeholder={
                        parent.eConcactName2
                          ? parent.eConcactName2
                          : 'Secondary Contact'
                      }
                      style={{width: '400px', marginRight: '50px'}}
                      onChange={this.handleTextboxChange}
                    />
                    <InfoInput
                      name="eContactPhone2"
                      placeholder={
                        parent.eContactPhone2
                          ? parent.eContactPhone2
                          : 'Phone Number'
                      }
                      style={{width: '180px'}}
                      onChange={this.handleTextboxChange}
                    />
                  </InfoRow>
                </div>
              </div>
              <input
                type="submit"
                value="Update"
                id="submitButton"
                style={{background: primaryColor}}
              />
            </form>
          </ParentWrapper>
        ) : (
          <h4>Loading...</h4>
        )}
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
