import axios from 'axios'
import history from '../history'

/**
 * ACTION TYPES
 */
const GET_PARENT_INFO = 'GET_PARENT_INFO'
const CREATE_INFO = 'CREATE_INFO'
const UPDATE_PARENT_INFO = 'UPDATE_PARENT_INFO'

/**
 * INITIAL STATE
 */
const defaultParent = {}

/**
 * ACTION CREATORS
 */
const getParentInfo = (parent) => ({type: GET_PARENT_INFO, parent})
const createParentInfo = (parent) => ({type: CREATE_INFO, parent})
const updateParentInfo = (parent) => ({type: UPDATE_PARENT_INFO, parent})

/**
 * THUNK CREATORS
 */
export const fetchParent = (id) => async (dispatch) => {
  try {
    const res = await axios.get(`api/parents/${id}`)
    dispatch(getParentInfo(res.data || defaultParent))
  } catch (err) {
    console.error(err)
  }
}

export const addParentInfo = (info) => async (dispatch) => {
  let res
  console.log('addParentInfo: ', info)
  try {
    res = await axios.post(`api/parents`, info)
  } catch (err) {
    return dispatch(createParentInfo({error: err}))
  }
  try {
    dispatch(getParentInfo(res.data))
    // history.push('/schedule')
  } catch (dispatchOrHistoryErr) {
    console.error(dispatchOrHistoryErr)
  }
}

export const changeParentInfo = (id, info) => async (dispatch) => {
  console.log('changeParentInfo: ', info)
  let res
  try {
    res = await axios.put(`api/parents/${id}`, info)
  } catch (err) {
    console.error(err)
  }
  try {
    dispatch(updateParentInfo(res.data))
    history.push('api/schedule')
  } catch (err) {
    console.error(err)
  }
}

/**
 * REDUCER
 */
export default function (state = defaultParent, action) {
  switch (action.type) {
    case GET_PARENT_INFO:
      return action.parent
    case CREATE_INFO:
      return action.parent
    case UPDATE_PARENT_INFO:
      return action.parent
    default:
      return state
  }
}
