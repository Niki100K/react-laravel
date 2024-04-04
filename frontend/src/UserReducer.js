const initialState = {
    userData: {}
}

export const UserReducer = (state = initialState, { type, payload }) => {
  switch (type) {

  case 'setData':
    return { ...state, userData: payload }
    case 'unsetData':
        return { ...state, userData: {} }
  default:
    return state
  }
}