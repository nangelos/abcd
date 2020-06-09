import React, {Component} from 'react'
import styled from 'styled-components'
import {connect} from 'react-redux'
import {secondaryColor, primaryColor} from '../../constants'
import ParentUpdate from './parent-update'
import StudentUpdate from './student-update'

const SettingsWrapper = styled.div`
  display: inline-block;
  width: 100%;
`

const SettingsUpdate = styled.div`
  background: ${secondaryColor};
  margin: 10px;
  padding: 5px;
  width: 80%;
`
const Sidebar = styled.div`
  width: 20%;
  text-align: left;
  display: flex;
  background: ${primaryColor};
  flex-direction: column;
  justify-content: space-evenly;
`

const Tab = styled.button`
  font-weight: ${(state) => (state.active ? 'bold' : 'normal')};
  background: ${(state) =>
    state.active ? `rgba(50, 52, 52, 0.8)` : `rgba(50, 52, 52, 0.3)`};
  padding: 1em 0.5em;
  width: 100%;
  border: none;
  color: white;
  font-size: large;
  &:hover {
    opacity: 0.9;
    cursor: pointer;
  }
`

class Settings extends Component {
  state = {
    active: 'ParentInfo',
    students: [],
  }

  changeActive = (evt) => {
    evt.preventDefault()
    const {value} = evt.target
    this.setState({active: value})
  }

  render() {
    const {active} = this.state
    const userId = this.props.state.user.id
    return (
      <div style={{textAlign: 'center'}}>
        <SettingsWrapper>
          <div style={{display: 'flex'}}>
            <Sidebar>
              <Tab
                onClick={this.changeActive}
                active={this.state.active === 'ParentInfo'}
                value="ParentInfo"
              >
                Parent Info
              </Tab>
              <Tab
                onClick={this.changeActive}
                active={this.state.active === 'StudentInfo'}
                value="StudentInfo"
              >
                Student Info
              </Tab>
              <Tab
                onClick={this.changeActive}
                active={this.state.active === 'Payment'}
                value="Payment"
              >
                Payment
              </Tab>
            </Sidebar>
            <SettingsUpdate>
              {active === 'ParentInfo' ? (
                <ParentUpdate userId={userId} />
              ) : active === 'StudentInfo' ? (
                <StudentUpdate userId={userId} />
              ) : (
                <h1>Payment Info</h1>
              )}
            </SettingsUpdate>
          </div>
        </SettingsWrapper>
      </div>
    )
  }
}

const mapState = (state) => ({state})
export default connect(mapState)(Settings)
