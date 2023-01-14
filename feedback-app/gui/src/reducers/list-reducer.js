const INITIAL_STATE = {
  user: null,
  error: null,
  fetching: false,
  fetched: false
}

export default function reducer (state = INITIAL_STATE, action) {
  switch (action.type) {
    /*case 'LOGIN_USER_PENDING':
      return { ...state, error: null, fetching: true, fetched: false }
    case 'LOGIN_USER_FULFILLED':
      return { ...state, notes: action.payload, fetching: false, fetched: true }
    case 'LOGIN_USER_REJECTED':
      return { ...state, error: action.payload, fetching: false, fetched: false }*/
    default:
      return state
  }
}
