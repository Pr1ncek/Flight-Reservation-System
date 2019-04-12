import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { logoutUser } from './actions/auth-actions';
import 'semantic-ui-css/semantic.min.css';
import './Grid.css';
import './App.css';

class App extends Component {
  render() {
    return (
      <header className="App">
        <nav>
          <div className="row">
            {this.props.auth.isAuthenticated ? (
              <ul>
                <li>
                  <Link to="/search">Find a flight</Link>
                </li>
                <li>
                  <Link to="/about">About us</Link>
                </li>
                <li>
                  <Link to="/account">My Account</Link>
                </li>
                <li>
                  <Link to="/" onClick={this.props.logoutUser}>
                    Logout
                  </Link>
                </li>
              </ul>
            ) : (
              <ul>
                <li>
                  <Link to="/search">Find a flight</Link>
                </li>
                <li>
                  <Link to="/about">About us</Link>
                </li>
                <li>
                  <Link to="/login">Login</Link>
                </li>
                <li>
                  <Link to="/register">Sign up</Link>
                </li>
              </ul>
            )}
          </div>
        </nav>
        <div className="hero-text-box">
          <h1>
            Find the best deals &
            <br />
            Fly with confidence
          </h1>
          <Link to="/search" className="btn btn-full">
            Book Flight
          </Link>
          <Link to="/about" className="btn btn-ghost">
            Learn More
          </Link>
        </div>
      </header>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { logoutUser }
)(App);
