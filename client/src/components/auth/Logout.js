import React, { Component } from "react";
import { logout } from "../../actions/authActions";
import { connect } from "react-redux";
import { NavLink } from "reactstrap";
import PropType from "prop-types";

class Logout extends Component {
  static propTypes = {
    logout: PropType.func.isRequired,
  };

  render() {
    return (
      <div>
        <NavLink onClick={this.props.logout}>Logout</NavLink>
      </div>
    );
  }
}

export default connect(null, { logout })(Logout);
