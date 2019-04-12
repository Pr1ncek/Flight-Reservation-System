import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { loginUser } from '../../actions/auth-actions';
import { Grid, Form, Segment, Button, Header, Message } from 'semantic-ui-react';

class Login extends Component {
  state = {
    email: '',
    password: '',
    errors: {},
    loading: false
  };

  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      this.props.history.push('/');
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.auth.isAuthenticated) this.props.history.push('/search');
    if (nextProps.errors) this.setState({ errors: nextProps.errors, loading: false });
  }

  handleSubmit = event => {
    this.setState({ loading: true });
    event.preventDefault();
    const { email, password } = this.state;
    this.props.loginUser({ email, password });
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
    const { email, password, loading, errors } = this.state;
    return (
      <div className="Login">
        <div className="col span-1-of-2 side-image" />
        <div className="col span-1-of-2 form">
          <Grid textAlign="center" verticalAlign="middle">
            <Grid.Column style={{ maxWidth: '600px', marginLeft: '-20px', marginTop: '50px' }}>
              <Header as="h2" style={{ fontWeight: 300, fontSize: '35px' }}>
                SIGN IN TO YOUR ACCOUNT
              </Header>
              <Form size="large" onSubmit={this.handleSubmit}>
                <Segment stacked>
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

                  <Button fluid size="large" color="red" loading={loading} disabled={loading}>
                    Sign in
                  </Button>
                </Segment>
              </Form>
              {Object.keys(errors).length === 1 && <Message error>{this.displayErrors()}</Message>}
              <Message>
                New user? <Link to="/register">Register</Link>
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
  { loginUser }
)(Login);
