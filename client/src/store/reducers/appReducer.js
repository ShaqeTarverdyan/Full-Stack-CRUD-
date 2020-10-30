import { CONSTANTS } from '../actions/Constants';

const initialState = {
  isShownModal: false
}

export default (state = initialState, {type, payload}) => {
    const newState = {...state}
    switch(type) {
      case CONSTANTS.SHOW_MODAL: {
        return {
          ...newState,
          isShownModal: true
        }
      }
      case CONSTANTS.CLOSE_MODAL: {
        return {
          ...newState,
          isShownModal: false
        }
      }
        default: {
			return newState
		}
    }
}