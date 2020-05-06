import React, {Component} from 'react'
import styled from 'styled-components'

const Parent = styled.div`
  display: flex;
  justify-content: space-around;
  background: purple;
  width: 100%;
  margin: 10px;
`
const InfoInput = styled.input`
  // width: 50px;
  font-size: large;
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
    parentState: '',
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

  render() {
    return (
      <Parent>
        <form>
          <InfoInput
            name="parenttFirst"
            placeholder="Parent First Name"
            onChange={this.handleTextboxChange}
          />
          <InfoInput
            name="parenttLast"
            placeholder="Parent Last Name"
            onChange={this.handleTextboxChange}
          />
          <br />
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
        </form>
      </Parent>
    )
  }
}

export default ParentInfo
