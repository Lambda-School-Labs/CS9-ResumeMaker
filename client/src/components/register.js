import React, { Component } from "react";
import {
  Modal,
  Button,
  FormGroup,
  FormControl,
  ControlLabel,
  HelpBlock
} from "react-bootstrap";
import "./CSS/login.css";
import axios from "axios";

const urls = require("../config.json");

class Register extends Component {
  state = {
    email: "screech@gmail.com",
    password: "Screech1G!",
    confirmPassword: "Screech1G!",
    username: "screech",
    submitted: false,
    submittedError: false,
    usernameInvalid: false,
    emailInvalid: false,
    passwordInvalid: false
  };

  validateForm() {
    return (
      this.state.email.length > 0 &&
      this.state.password.length > 0 &&
      this.state.username.length > 0 &&
      this.state.confirmPassword === this.state.password
    );
  }

  handleChange = event => {
    this.setState({
      [event.target.id]: event.target.value
    });
  };

  checkInputValidity = () => {
    this.setState({
      usernameInvalid: false,
      emailInvalid: false,
      passwordInvalid: false
    });
    const usernamePromise = axios
      .get(`${urls[urls.basePath]}/users/${this.state.username}`)
      .then(response => {
        console.log(response);
        this.setState({ usernameInvalid: true });
      })
      .catch(err => {
        console.log(err);
      });
    const emailPromise = axios
      .get(`${urls[urls.basePath]}/users/emailcheck/${this.state.email}`)
      .then(response => {
        console.log(response);
        this.setState({ emailInvalid: true });
      })
      .catch(err => {
        console.log(err);
        if (!this.validateEmail()) {
          this.setState({ emailInvalid: true });
        }
      });
    if (!this.checkPasswordStrength(this.state.password)) {
      this.setState({ passwordInvalid: true });
    }

    // If all fields are valid and the confirm password matches password,
    // then account info is submitted and the user redirected to a modal with a link to the login page
    Promise.all([usernamePromise, emailPromise]).then(values => {
      console.log("The current state:", this.state);
      if (
        this.state.usernameInvalid === false &&
        this.state.emailInvalid === false &&
        this.state.passwordInvalid === false &&
        this.state.password === this.state.confirmPassword
      ) {
        this.handleSubmit();
      } else {
        this.componentDidMount();
      }
    });
  };

  componentDidMount = () => {
    this.render();
  };

  validateEmail = email => {
    const re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return re.test(email);
  };

  checkPasswordStrength = password => {
    const minlength = 6;

    if (password.length < minlength) return false;
    if (!password.match(/[A-Z]/)) return false;
    if (!password.match(/[a-z]/)) return false;
    if (!password.match(/\d/)) return false;
    if (!password.match(/[`~!@#$%^&*\(\)_\-\+=\[{\]}\|\\:;"'<,>\.\?\/]/))
      return false;
    return true;
  };

  handleSubmit = () => {
    console.log("handleSubmit called");
    // Putting the set state here allows the submit modal to show before
    // the email is sent. If the response gives an error the submittedError property
    // will override the submitted modal and show there was an error.
    this.setState({ submitted: true });
    axios
      .post(`${urls[urls.basePath]}/users/register`, {
        username: this.state.username,
        email: this.state.email,
        password: this.state.password
      })
      .then(response => {
        console.log(response);
      })
      .catch(err => {
        console.log("err", err);
        this.setState({ submittedError: true, submitted: false });
      });
  };

  resetSubmitStatus = () => {
    this.setState({ submitted: false, submittedError: false });
  };

  render() {
    if (this.state.submittedError === true) {
      return (
        <div className="Login">
          <div className="static-modal">
            <Modal.Dialog>
              {/* <Modal.Header>
                <Modal.Title>We don't need a header probably</Modal.Title>
              </Modal.Header> */}
              <Modal.Body>
                There was an error with your submission or our server is down.
                Please try again in a few minutes.
              </Modal.Body>
              <Modal.Footer>
                <Button
                  bsStyle="primary"
                  onClick={() => {
                    this.resetSubmitStatus();
                  }}
                >
                  Try again
                </Button>
              </Modal.Footer>
            </Modal.Dialog>
          </div>
        </div>
      );
    } else if (this.state.submitted === false) {
      return (
        <div className="Login">
          <form>
            <FormGroup
              controlId="username"
              bsSize="small"
              // validationState={!this.state.invalidUsername}
            >
              <ControlLabel>Username</ControlLabel>
              <FormControl
                autoFocus
                type="username"
                value={this.state.username}
                onChange={this.handleChange}
              />
              {this.state.invalidUsername === true ? (
                <HelpBlock>This username is already in use.</HelpBlock>
              ) : null}
            </FormGroup>
            <FormGroup
              controlId="email"
              bsSize="large"
              // validationState={!this.state.invalidEmail}
            >
              <ControlLabel>Email</ControlLabel>
              <FormControl
                autoFocus
                type="email"
                value={this.state.email}
                onChange={this.handleChange}
              />
              {this.state.invalidEmail ? (
                <HelpBlock>Please enter an unused valid email.</HelpBlock>
              ) : null}
            </FormGroup>
            <FormGroup
              controlId="password"
              bsSize="large"
              // validationState={!this.state.invalidPassword}
            >
              <ControlLabel>Password</ControlLabel>
              <FormControl
                type="password"
                value={this.state.password}
                onChange={this.handleChange}
              />
              {this.state.invalidPassword ? (
                <HelpBlock>
                  Please use a complex password at least 8 characters long.
                </HelpBlock>
              ) : null}
            </FormGroup>
            <FormGroup controlId="confirmPassword" bsSize="large">
              <ControlLabel>Confirm password</ControlLabel>
              <FormControl
                type="password"
                value={this.state.confirmPassword}
                onChange={this.handleChange}
              />
            </FormGroup>
            <Button
              block
              bsSize="large"
              disabled={!this.validateForm()}
              onClick={() => this.checkInputValidity()}
            >
              Register
            </Button>
          </form>
        </div>
      );
    } else {
      return (
        <div className="Login">
          <div className="static-modal">
            <Modal.Dialog>
              {/* <Modal.Header>
                <Modal.Title>We don't need a header probably</Modal.Title>
              </Modal.Header> */}
              <Modal.Body>
                Thank you for registering. Please check your email to finish
                account creation.
              </Modal.Body>
              <Modal.Footer>
                <Button
                  bsStyle="primary"
                  onClick={() => {
                    this.props.history.push("/login");
                  }}
                >
                  Take me to the login page
                </Button>
              </Modal.Footer>
            </Modal.Dialog>
          </div>
        </div>
      );
    }
  }
}

export default Register;
