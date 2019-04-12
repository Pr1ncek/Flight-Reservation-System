import React, { Component } from 'react';
import { Input, Grid, Button } from 'semantic-ui-react';

const style = {
  marginTop: '1%',
  marginLeft: 'auto',
  marginRight: 'auto',
  marginBottom: '1%',
  border: '1px solid black',
  background: 'white',
  padding: '25px',
  paddingLeft: '40px',
  paddingRight: '40px',
  borderRadius: '5px'
};

class Search extends Component {
  state = {
    origin: '',
    destination: ''
  };

  onChangeHandler = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  render() {
    const { origin, destination, date } = this.state;
    return (
      <Grid columns="equal" style={style}>
        <Grid.Row>
          <Grid.Column>
            <Input
              style={{ width: '100%' }}
              type="text"
              name="origin"
              placeholder="Origin "
              value={origin}
              onChange={this.onChangeHandler}
            />
          </Grid.Column>
          <Grid.Column>
            <Input
              style={{ width: '100%' }}
              type="text"
              name="destination"
              placeholder="Destination"
              value={destination}
              onChange={this.onChangeHandler}
            />
          </Grid.Column>
        </Grid.Row>
        <Button
          onClick={() => this.props.findFlights(origin, destination)}
          floated="right"
          primary
          style={{ width: '95%', paddingTop: '2%', paddingBottom: '2%', marginLeft: '2.5%', marginTop: '1%' }}
          loading={this.props.loading}
          disabled={this.props.loading || origin.trim() === '' || destination.trim() === '' || date === ''}
        >
          Find Flights
        </Button>
      </Grid>
    );
  }
}

export default Search;
