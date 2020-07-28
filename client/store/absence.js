import axios from 'axios'
import history from '../history'

/**
 * ACTION TYPES
 */
const GET_ALL_ABSENCES = 'GET_ALL_ABSENCES'
const GET_STUDENT_ABSENCES = 'GET_STUDENT_ABSENCES'
const CREATE_ABSENCE = 'CREATE_ABSENCE'
const UPDATE_ABSENCE = 'UPDATE_ABSENCE'
const DELETE_ABSENCE = 'DELETE_ABSENCE'

/**
 * INITIAL STATE
 */
const defaultAbsence = []

/**
 * ACTION CREATORS
 */
const getAllAbsences = (data) => ({type: GET_ALL_ABSENCES, data})
const getStudentAbsences = (data) => ({type: GET_STUDENT_ABSENCES, data})
const createAbsence = (data) => ({type: CREATE_ABSENCE, data})
const updateAbsence = (data) => ({type: UPDATE_ABSENCE, data})

/**
 * THUNK CREATORS
 */
export const fetchAllAbsences = () => async (dispatch) => {
  try {
    const res = await axios.get(`api/absences`)
    dispatch(getAllAbsences(res.data || defaultAbsence))
  } catch (err) {
    console.error(err)
  }
}

export const fetchStudentAbsences = (id) => async (dispatch) => {
  try {
    const res = await axios.get(`api/absences/${id}`)
    dispatch(getStudentAbsences(res.data || defaultAbsence))
  } catch (err) {
    console.error(err)
  }
}

export const addAbsence = (info) => async (dispatch) => {
  let res
  try {
    res = await axios.post(`api/absences`, info)
    dispatch(createAbsence(res.data))
  } catch (err) {
    console.error(err)
  }
}

export const changeAbsence = (id, info) => async (dispatch) => {
  let res
  try {
    res = await axios.put(`api/absences/${id}`, info)
  } catch (err) {
    console.error(err)
  }
  try {
    dispatch(updateAbsence(res.data))
  } catch (err) {
    console.error(err)
  }
}

/**
 * REDUCER
 */
export default function (state = defaultAbsence, action) {
  switch (action.type) {
    case GET_ALL_ABSENCES:
      return [...state, action.data]
    case GET_STUDENT_ABSENCES:
      return [...state, action.data]
    case CREATE_ABSENCE:
      return action.data
    case UPDATE_ABSENCE:
      return action.data
    default:
      return state
  }
}
