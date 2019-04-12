import axios from 'axios';
import { SET_FLIGHTS, START_LOADING, END_LOADING } from './types';

export const findFlights = (origin, destination) => dispatch => {
  dispatch({ type: START_LOADING });
  axios
    .get(`/api/search/${origin}/${destination}`)
    .then(res => {
      dispatch({
        type: SET_FLIGHTS,
        payload: res.data
      });
      dispatch({ type: END_LOADING });
    })
    .catch(err => console.error(err));
};
