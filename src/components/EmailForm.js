import React, { Component } from 'react';

const encode = data => {
  return Object.keys(data)
    .map(key => encodeURIComponent(key) + '=' + encodeURIComponent(data[key]))
    .join('&');
};

export class EmailForm extends Component {
  constructor() {
    super();
    this.state = { feedback: '', email: '' };
    this.onSubmit = this.onSubmit.bind(this);
  }

  handleChange = e => this.setState({ [e.target.name]: e.target.value });

  onSubmit(e) {
    fetch('/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: encode({ 'form-name': 'signup', ...this.state }),
    })
      .then(() => {
        this.setState({ feedback: 'Thank you!' });
        setTimeout(() => {
          this.setState({ feedback: '' });
        }, 3000);
      })
      .catch(e => console.error(e));
    e.preventDefault();
    e.stopPropagation();
  }

  render() {
    const { feedback, email } = this.state;
    return (
      <form
        id="signup-form"
        onSubmit={this.onSubmit}
        method="post"
        name="signup"
        netlify-honeypot="bot-field"
        data-netlify="true"
        hidden
      >
        <input
          type="email"
          name="email"
          id="email"
          placeholder="Your Email Address"
          value={email}
          onChange={this.handleChange}
          required
        />
        <input type="hidden" name="bot-field" />
        <input type="submit" value="Sign Up" />
        <span className={`${feedback ? 'visible success' : ''} message`}>
          {feedback}
        </span>
      </form>
    );
  }
}

export default EmailForm;
