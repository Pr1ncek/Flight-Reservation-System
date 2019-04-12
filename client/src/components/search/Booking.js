import React from 'react';
import { withRouter } from 'react-router-dom';
import { Container, Card, Form, Button, Message } from 'semantic-ui-react';

const style = {
  marginLeft: '25%',
  marginRight: '25%',
  margin: 0,
  padding: 0,
  paddingTop: '2%'
};

var weekday = new Array(7);
weekday[0] = 'Sunday';
weekday[1] = 'Monday';
weekday[2] = 'Tuesday';
weekday[3] = 'Wednesday';
weekday[4] = 'Thursday';
weekday[5] = 'Friday';
weekday[6] = 'Saturday';

const getWeekdays = weekday => weekday.split(',').map(day => <span> {day}</span>);

class Booking extends React.Component {
  state = {
    firstName: '',
    lastName: '',
    date: '',
    loading: false,
    errors: []
  };

  componentDidMount() {
    if (!this.props.auth.isAuthenticated) {
      this.props.history.push('/login');
    }
  }

  onChangeHandler = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleSubmit = event => {
    event.preventDefault();
    console.log(this.props);
    if (this.validateInputs()) {
      this.setState({ errors: [], loading: true });
      this.props.createNewBooking(
        {
          flightId: this.props.flight._id,
          flightDate: this.state.date,
          tripId: this.props.flight.trip._id,
          userId: this.props.auth.user.id,
          firstName: this.state.firstName,
          lastName: this.state.lastName
        },
        this.props.history
      );
    }
  };
  validateInputs = () => {
    const { firstName, lastName, date } = this.state;
    const errors = [];
    if (firstName.trim() === '') {
      this.setState({ errors: errors.concat('First Name is Required') });
      return false;
    }
    if (lastName.trim() === '') {
      this.setState({ errors: errors.concat('Last Name is Required') });
      return false;
    }
    var parts = date.toString().split('-');
    var mydate = new Date(parts[0], parts[1] - 1, parts[2]);
    console.log(mydate.toDateString());
    const day = weekday[mydate.getDay()];
    console.log(day);
    console.log(this.props.flight.trip.weekday.split(','));
    if (!this.props.flight.trip.weekday.split(',').includes(day)) {
      this.setState({ errors: errors.concat('Date must match the flight schedule') });
      return false;
    }
    return true;
  };

  displayErrors = () => this.state.errors.map((error, i) => <p key={i}>{error}</p>);

  getErrors = inputName => this.state.errors.some(error => error.toLowerCase().includes(inputName));

  render() {
    const { flight } = this.props;
    const { firstName, lastName, date, errors, loading } = this.state;
    return (
      <Container style={style}>
        <h1 style={{ textAlign: 'center', fontSize: '180%' }}>Confirm Your Reservation</h1>
        <Card style={{ padding: '1%', width: '95%' }}>
          <Card.Content>
            <h1>
              <strong>{flight.flightName}</strong>
            </h1>
            <p>Departure Time: {flight.trip.departureTime}</p>
            <p>Arrival Time: {flight.trip.arrivalTime}</p>
            <p>Origin Airport: {flight.trip.originAirport}</p>
            <p>Destination Airport: {flight.trip.destinationAirport}</p>
            <p>Schedule: {getWeekdays(flight.trip.weekday)}</p>
          </Card.Content>
        </Card>
        <Container style={{ width: '70%' }}>
          <Form size="large" onSubmit={this.handleSubmit}>
            <Form.Input
              fluid
              type="date"
              name="date"
              value={date}
              min={new Date().toISOString().substring(0, 10)}
              label="Confirm Your Flight Date"
              onChange={this.onChangeHandler}
              className={this.getErrors('date') ? 'error' : ''}
            />
            <Form.Input
              fluid
              id="form-subcomponent-shorthand-input-first-name"
              name="firstName"
              value={firstName}
              label="First name"
              placeholder="First name"
              onChange={this.onChangeHandler}
              className={this.getErrors('first name') ? 'error' : ''}
            />
            <Form.Input
              fluid
              id="form-subcomponent-shorthand-input-last-name"
              name="lastName"
              value={lastName}
              label="Last name"
              placeholder="Last name"
              onChange={this.onChangeHandler}
              className={this.getErrors('last name') ? 'error' : ''}
            />
            <Button
              color="green"
              style={{
                width: '100%',
                paddingTop: '2%',
                paddingBottom: '2%',
                marginTop: '1%'
              }}
              loading={loading}
              disabled={loading}
            >
              Book Flight
            </Button>
          </Form>
          {errors.length > 0 && (
            <Message error style={{ marginBottom: '1%' }}>
              {this.displayErrors()}
            </Message>
          )}
        </Container>
      </Container>
    );
  }
}

export default withRouter(Booking);
