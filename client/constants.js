import styled from 'styled-components'

export const primaryColor = 'rgb(90, 165, 241)'
export const secondaryColor = 'rgb(231, 231, 231)'

export const schoolList = [
  'West Elementary',
  'East Elementary',
  'North Elementary',
  'South Elementary',
]

export const gradesList = [
  'Pre-K',
  'Kindergarten',
  'First',
  'Second',
  'Third',
  'Fourth',
  'Fifth',
  'Sixth',
]

export const daysList = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday']

//prettier-ignore
export const blankWeek = [
    {id: '00', day: '', date: ''}, {id: '01', day: '', date: ''},
    {id: '02', day: '', date: ''}, {id: '03', day: '', date: ''},
    {id: '04', day: '', date: ''}, {id: '05', day: '', date: ''},
    {id: '06', day: '', date: ''},
  ]
//prettier-ignore
export const blankWeekFin = [
    {id: '010', day: '', date: ''}, {id: '011', day: '', date: ''},
    {id: '021', day: '', date: ''}, {id: '031', day: '', date: ''},
    {id: '041', day: '', date: ''}, {id: '051', day: '', date: ''},
    {id: '061', day: '', date: ''}
  ]
// prettier-ignore
export const weekdays = ['Sunday', 'Monday', 'Tuesday',
  'Wednesday', 'Thursday', 'Friday', 'Saturday']

export const infoString =
  'Please enter any additional information you would like us to know (e.g. allergies, special circumstances, etc.)'

// prettier-ignore
export const stateList = [
  'AL',  'AK',  'AZ',  'AR',  'CA',  'CO',  'CT',  'DC',  'DE',  'FL',
  'GA',  'HI',  'ID',  'IL',  'IN',  'IA',  'KS',  'KY',  'LA',  'ME',
  'MD',  'MA',  'MI',  'MN',  'MS',  'MO',  'MT',  'NE',  'NV',  'NH',
  'NJ',  'NM',  'NY',  'NC',  'ND',  'OH',  'OK',  'OR',  'PA',  'RI',
  'SC',  'SD',  'TN',  'TX',  'UT',  'VT',  'VA',  'WA',  'WV',  'WI',  'WY',
]

export const InfoInput = styled.input`
  margin: 10px;
  font-size: large;
  width: 300px;
  height: 30px;
  padding: 0px 0px 0px 5px;
`
export const InfoRow = styled.div`
  display: flex;
  justify-content: flex-start;
  margin-top: 8px;
  margin-bottom: 8px;
`
