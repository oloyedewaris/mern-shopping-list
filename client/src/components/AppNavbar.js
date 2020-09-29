import React, { Component, Fragment } from "react";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  Container,
} from "reactstrap";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import RegisterModal from "./auth/RegisterModal";
import LoginModal from "./auth/LoginModal";
import Logout from "./auth/Logout";

class AppNavbar extends Component {
  state = {
    isOpen: false,
  };

  toggle = () => {
    this.setState({ isOpen: !this.state.isOpen });
  };
  static propTypes = {
    auth: PropTypes.object.isRequired,
  };

  render() {
    const { isAuthenticated, user } = this.props.auth;
    const authLink = (
      <Fragment>
        <NavItem>
          <span>
            <strong>{user ? `Welcome ${user.name}` : ""}</strong>
          </span>
          <Logout />
        </NavItem>
      </Fragment>
    );
    const guestLink = (
      <Fragment>
        <NavItem>
          <LoginModal />
        </NavItem>
        <NavItem>
          <RegisterModal />
        </NavItem>
      </Fragment>
    );
    return (
      <div>
        <Navbar color="dark" expand="sm" className="mb-5" dark>
          Waris
          <Container>
            <NavbarBrand href="/">ShoppingList</NavbarBrand>
            <NavbarToggler onClick={this.toggle} />
            <Collapse isOpen={this.state.isOpen} navbar>
              <Nav className="ml-auto" navbar>
                {isAuthenticated ? authLink : guestLink}
              </Nav>
            </Collapse>
          </Container>
        </Navbar>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
});

export default connect(mapStateToProps, null)(AppNavbar);
