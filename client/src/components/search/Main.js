import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Grid } from 'semantic-ui-react';
import Search from './Search';
import Results from './Results';
import { findFlights } from '../../actions/search';
import { createNewBooking } from '../../actions/booking-actions';
import Booking from './Booking';
import Navbar from '../navbar/Navbar';

class Main extends Component {
  state = {
    flightSelected: false,
    flight: {}
  };

  setFlight = flight => {
    console.log(flight);
    this.setState({ flight, flightSelected: true });
  };

  render() {
    if (this.state.flightSelected)
      return (
        <Booking
          flight={this.state.flight}
          auth={this.props.auth}
          createNewBooking={this.props.createNewBooking}
        />
      );
    return (
      <React.Fragment>
        <Navbar />
        <div className="main-search">
          <Grid>
            <Search findFlights={this.props.findFlights} loading={this.props.loading} />
            <Grid.Row>
              <Results results={this.props.results} loading={this.props.loading} setFlight={this.setFlight} />
            </Grid.Row>
          </Grid>
        </div>
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => ({
  results: state.results,
  loading: state.loading,
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { findFlights, createNewBooking }
)(Main);
