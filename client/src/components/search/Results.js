import React from 'react';
import { Button, Card } from 'semantic-ui-react';

const style = {
  overflowY: 'scroll',
  height: '500px',
  padding: 0,
  width: '100%'
};

const style2 = {
  margin: '0 auto',
  marginLeft: '5%',
  padding: '2%'
};

const getWeekdays = weekday => weekday.split(',').map(day => <span> {day}</span>);

const Results = props => {
  const { flights } = props.results;
  console.log(flights);
  if (!flights || flights.length === 0) return null;
  return (
    <div style={style}>
      <div style={style2}>
        {flights &&
          flights.length !== 0 &&
          flights.map(flight => (
            <Card style={{ padding: '1%', width: '95%' }} key={flight.id}>
              <Card.Content>
                <h1>
                  <strong>{flight.flightName}</strong>
                </h1>
                <p>Departure Time: {flight.trip.departureTime}</p>
                <p>Arrival Time: {flight.trip.arrivalTime}</p>
                <p>
                  Origin Airport: {flight.trip.originAirport} | {flight.trip.origin}
                </p>
                <p>
                  Destination Airport: {flight.trip.destinationAirport} | {flight.trip.destination}
                </p>
                <p>Schedule: {getWeekdays(flight.trip.weekday)}</p>
                <Button color="green" floated="right" onClick={() => props.setFlight(flight)}>
                  Purchase ${flight.trip.price}
                </Button>
              </Card.Content>
            </Card>
          ))}
      </div>
    </div>
  );
};

export default Results;
