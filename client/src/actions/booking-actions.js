import axios from 'axios';

export const createNewBooking = (data, history) => dispatch => {
  console.log(data);
  axios
    .post('/api/booking/new', data)
    .then(res => {
      console.log(res);
      history.push('/myaccount');
    })
    .catch(err => console.error(err));
};
