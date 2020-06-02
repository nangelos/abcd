import axios from 'axios'
import history from '../history'

/**
 * ACTION TYPES
 */
const GET_STUDENT_INFO = 'GET_STUDENT_INFO'
const CREATE_INFO = 'CREATE_INFO'
const UPDATE_STUDENT_INFO = 'UPDATE_STUDENT_INFO'

/**
 * INITIAL STATE
 */
const defaultStudent = {}

/**
 * ACTION CREATORS
 */
const getStudentInfo = (student) => ({type: GET_STUDENT_INFO, student})
const createStudentInfo = (student) => ({type: CREATE_INFO, student})
const updateStudentInfo = (student) => ({type: UPDATE_STUDENT_INFO, student})

/**
 * THUNK CREATORS
 */
export const fetchStudent = (id) => async (dispatch) => {
  try {
    const res = await axios.get(`api/students/${id}`)
    dispatch(getStudentInfo(res.data || defaultStudent))
  } catch (err) {
    console.error(err)
  }
}

export const addStudentInfo = (info) => async (dispatch) => {
  let res
  console.log('addStudentInfo: ', info)
  try {
    res = await axios.post(`api/students`, info)
  } catch (err) {
    return dispatch(createStudentInfo({error: err}))
  }
  try {
    dispatch(getStudentInfo(res.data))
    // history.push('/schedule')
  } catch (dispatchOrHistoryErr) {
    console.error(dispatchOrHistoryErr)
  }
}

export const changeStudentInfo = (id, info) => async (dispatch) => {
  console.log('changeStudentInfo: ', info)
  let res
  try {
    res = await axios.put(`api/students/${id}`, info)
  } catch (err) {
    console.error(err)
  }
  try {
    dispatch(updateStudentInfo(res.data))
    // history.push('/settings')
  } catch (err) {
    console.error(err)
  }
}

/**
 * REDUCER
 */
export default function (state = defaultStudent, action) {
  switch (action.type) {
    case GET_STUDENT_INFO:
      return action.student
    case CREATE_INFO:
      return action.student
    case UPDATE_STUDENT_INFO:
      return action.student
    default:
      return state
  }
}
