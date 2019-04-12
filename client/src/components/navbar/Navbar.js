import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Menu, Image, Button } from 'semantic-ui-react';

class Navbar extends Component {
  state = {
    activeItem: ''
  };

  handleItemClick = (e, { name }) => this.setState({ activeItem: name });

  render() {
    const { activeItem } = this.state;

    return (
      <Menu
        style={{ paddingBottom: 0, marginBottom: 0, height: '50px', paddingLeft: '10%', paddingRight: '10%' }}
      >
        <Menu.Item
          style={{ fontWeight: 'bold' }}
          name="HOME"
          active={activeItem === 'HOME'}
          onClick={() => this.props.history.push('/')}
        />

        <Menu.Item
          style={{ fontWeight: 'bold' }}
          name="FIND A FLIGHT"
          active={activeItem === 'FIND A FLIGHT'}
          onClick={() => this.props.history.push('/search')}
        />
        {this.props.auth.isAuthenticated ? (
          <React.Fragment>
            <Menu.Item
              position="right"
              style={{ fontWeight: 'bold' }}
              name={this.props.auth.user.firstName + this.props.auth.user.lastName}
              active={activeItem === ''}
              onClick={() => this.props.history.push('/myaccount')}
            />
          </React.Fragment>
        ) : (
          <Menu.Item
            position="right"
            style={{ fontWeight: 'bold' }}
            name="SIGN IN"
            active={activeItem === 'SIGN IN'}
            onClick={() => this.props.history.push('/login')}
          />
        )}
      </Menu>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps)(withRouter(Navbar));
