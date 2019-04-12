import { SET_FLIGHTS } from '../actions/types';

const initialState = {
  flights: []
};

export default function(state = initialState, action) {
  switch (action.type) {
    case SET_FLIGHTS:
      return {
        flights: [...action.payload]
      };
    default:
      return state;
  }
}
