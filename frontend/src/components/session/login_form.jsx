import React, { Component } from 'react';

export default class LoginForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      errors: {},
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.renderErrors = this.renderErrors.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.currentUser === true) {
      this.props.history.push('/tweets');
    }

    this.setState({ errors: nextProps.errors });
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.login({ ...this.state });
  }

  handleChange(property) {
    return (e) => this.setState({ [property]: e.target.value });
  }

  renderErrors() {
    return (
      <ul>
        {Object.keys(this.state.errors).map((err, i) => (
          <li key={`error-${i}`}>{this.state.errors[err]}</li>
        ))}
      </ul>
    );
  }

  render() {
    const { email, password } = this.state;
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <div>
            <input
              type="text"
              value={email}
              onChange={this.handleChange('email')}
              placeholder="Email"
            />
            <br />
            <input
              type="password"
              value={password}
              onChange={this.handleChange('password')}
              placeholder="Password"
            />
            <br />
            <input type="submit" value="Submit" />
            {this.renderErrors()}
          </div>
        </form>
      </div>
    );
  }
}
