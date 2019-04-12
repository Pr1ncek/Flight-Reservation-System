import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { registerUser } from '../../actions/auth-actions';
import { Grid, Form, Segment, Button, Header, Message } from 'semantic-ui-react';

class Register extends Component {
  state = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    errors: {},
    loading: false
  };

  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      this.props.history.push('/search');
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) this.setState({ errors: nextProps.errors, loading: false });
  }

  handleSubmit = event => {
    this.setState({ loading: true });
    event.preventDefault();
    const { firstName, lastName, email, password, confirmPassword } = this.state;
    this.props.registerUser({ firstName, lastName, email, password, confirmPassword }, this.props.history);
  };

  handleChange = event => this.setState({ [event.target.name]: event.target.value });

  displayErrors = () => {
    const { errors } = this.state;
    if (Object.keys(errors).length === 1) {
      console.log('One error');
      return Object.keys(errors).map((errorName, i) => <p key={i}>{errors[errorName]}</p>);
    }
  };

  getErrors = inputName => Object.keys(this.state.errors).some(error => error === inputName);

  render() {
    const { firstName, lastName, email, password, confirmPassword, loading, errors } = this.state;
    return (
      <div className="Register">
        <div className="col span-1-of-2 side-image" />
        <div className="col span-1-of-2 form">
          <Grid textAlign="center" verticalAlign="middle">
            <Grid.Column style={{ maxWidth: '600px', marginLeft: '-20px' }}>
              <Header as="h2" style={{ fontWeight: 300, fontSize: '35px' }}>
                CREATE YOUR ACCOUNT
              </Header>
              <Form size="large" onSubmit={this.handleSubmit}>
                <Segment stacked>
                  <Form.Input
                    style={{ fontSize: '16px' }}
                    fluid
                    type="text"
                    name="firstName"
                    value={firstName}
                    icon="user"
                    iconPosition="left"
                    placeholder="First Name"
                    onChange={this.handleChange}
                    className={this.getErrors('firstName') ? 'error' : ''}
                  />
                  <Form.Input
                    style={{ fontSize: '16px' }}
                    fluid
                    type="text"
                    name="lastName"
                    value={lastName}
                    icon="user"
                    iconPosition="left"
                    placeholder="Last Name"
                    onChange={this.handleChange}
                    className={this.getErrors('lastName') ? 'error' : ''}
                  />
                  <Form.Input
                    style={{ fontSize: '16px' }}
                    fluid
                    type="email"
                    name="email"
                    value={email}
                    icon="mail"
                    iconPosition="left"
                    placeholder="Email Address"
                    onChange={this.handleChange}
                    className={this.getErrors('email') ? 'error' : ''}
                  />
                  <Form.Input
                    style={{ fontSize: '16px' }}
                    fluid
                    type="password"
                    name="password"
                    value={password}
                    icon="lock"
                    iconPosition="left"
                    placeholder="Password"
                    onChange={this.handleChange}
                    className={this.getErrors('password') ? 'error' : ''}
                  />
                  <Form.Input
                    style={{ fontSize: '16px' }}
                    fluid
                    type="password"
                    name="confirmPassword"
                    value={confirmPassword}
                    icon="repeat"
                    iconPosition="left"
                    placeholder="Comfirm Password"
                    onChange={this.handleChange}
                    className={this.getErrors('confirmPassword') ? 'error' : ''}
                  />
                  <Button fluid size="large" color="red" loading={loading} disabled={loading}>
                    Register
                  </Button>
                </Segment>
              </Form>
              {Object.keys(errors).length === 1 && <Message error>{this.displayErrors()}</Message>}
              <Message>
                Already a user? <Link to="/login">Login</Link>
              </Message>
            </Grid.Column>
          </Grid>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { registerUser }
)(withRouter(Register));
