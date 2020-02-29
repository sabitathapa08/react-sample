import React from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { TextInput, Checkbox, Button, Row } from "react-materialize";
import { Link } from "react-router-dom";
import { push } from "connected-react-router";
import styled from "styled-components";

import login_bg from "../../assets/img/login_bg.png";
import logo from "../../assets/img/logo.png";
import { userLoginRequest } from "../../actions/login";
import {
  makeSelectGetUserResponse,
  makeSelectErrorResponse,
  makeSelectLogoutResponse
} from "../../selectors/login";

// const errorStyle = {
//   color: "#d82416",
//   paddingLeft: "32px",
//   textTransform: "none"
// };

const ErrorStyle = styled.span`
  color: "#d82416";
  paddingleft: "32px";
  texttransform: "none";
`;

const mapStateToProps = createStructuredSelector({
  userData: makeSelectGetUserResponse(),
  errorResponse: makeSelectErrorResponse(),
  logoutResponse: makeSelectLogoutResponse()
});

const mapDispatchToProps = dispatch => ({
  goDashboard: () => dispatch(push("/dashboard")),
  userLogin: data => dispatch(userLoginRequest(data))
});

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {
        username: "",
        password: "",
        remember: false
      },
      errors: {
        usernameErr: "",
        passwordErr: ""
      },
      showPassword: false
    };
  }

  componentDidUpdate(prevProps) {
    if (prevProps.userData !== this.props.userData) {
      const data = this.props.userData;
      if (data) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("user_id", data.user_id);
      }
    }
  }

  handleOnChange = e => {
    const {
      target: { name, value }
    } = e;
    this.setState({
      data: {
        ...this.state.data,
        [name]: value
      },
      errors: {
        ...this.state.errors,
        [`${name}Err`]: ""
      }
    });
  };

  handleOnChecked = e => {
    e.persist();

    this.setState(state => {
      return {
        data: {
          ...state.data,
          remember: !this.state.data.remember
        }
      };
    });
  };

  handlePasswordChecked = () => {
    this.setState(({ showPassword }) => {
      !showPassword;
    });
  };

  hanldeValidation = () => {
    const { data } = this.state;
    const errors = {};
    if (!data.username) errors.usernameErr = "Username is required.";
    if (!data.password) errors.passwordErr = "Password is required.";

    return errors;
  };

  handleSubmit = e => {
    e.preventDefault();

    const errors = this.hanldeValidation();
    this.setState({
      errors
    });

    if (Object.keys(errors).length === 0) {
      this.props.userLogin(this.state.data);
    } else {
      console.log("error in login");
    }
  };

  render() {
    const { data, errors, showPassword } = this.state;

    return (
      <div
        className="authentication parallax-container"
        style={{ backgroundImage: `url(${login_bg})` }}
      >
        <div className="overlay" />

        <div className="container">
          <div className="card auth_form">
            <div className="header">
              <img className="logo" src={logo} alt="" />
              <h5>Log in</h5>
            </div>
            <div className="body">
              <form onSubmit={this.handleSubmit}>
                <Row>
                  <TextInput
                    s={12}
                    icon="email"
                    label="Username*"
                    type="text"
                    name="username"
                    value={data.username || ""}
                    onChange={this.handleOnChange}
                  />
                  {errors.usernameErr && (
                    <ErrorStyle>{errors.usernameErr}</ErrorStyle>
                  )}
                </Row>
                <Row>
                  <TextInput
                    s={12}
                    icon="lock_outline"
                    password={!showPassword}
                    label="Password*"
                    name="password"
                    value={data.password || ""}
                    onChange={this.handleOnChange}
                  />
                  <span onClick={this.handlePasswordChecked}>
                    {!showPassword && (
                      <i className="material-icons visibility">visibility</i>
                    )}
                    {!!showPassword && (
                      <i className="material-icons visibility">
                        visibility_off
                      </i>
                    )}
                  </span>
                  {errors.passwordErr && (
                    <ErrorStyle>{errors.passwordErr}</ErrorStyle>
                  )}
                </Row>
                <Row>
                  <div className="input-field col" style={{ margin: "1rem 0" }}>
                    <p s={12}>
                      <Checkbox
                        value=""
                        label="Remember Me"
                        checked={data.remember}
                        onChange={this.handleOnChecked}
                      />
                    </p>
                  </div>
                </Row>
                <Row>
                  <div
                    className="input-field col s12"
                    style={{ marginBottom: "1rem" }}
                  >
                    <Button
                      type="submit"
                      s={12}
                      className="waves-effect waves-light btn varicon-button waves-effect waves-light col s12"
                    >
                      SIGN IN
                    </Button>
                  </div>
                </Row>
                <Row>
                  <div className="input-field col s6">
                    <p className="margin medium-small">
                      <Link to="/signup">Register Now!</Link>
                    </p>
                  </div>

                  <div className="input-field col s6">
                    <p className="margin right-align medium-small">
                      <Link to="/forgot-password">Forgot password ?</Link>
                    </p>
                  </div>
                </Row>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);
