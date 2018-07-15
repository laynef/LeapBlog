import React, { Component } from 'react';
import { connect } from 'react-redux';


@connect((state) => ({
	user: state.user.login.data,
}))

export default class ForgottenPasswordPage extends Component {

	constructor(...args) {
		super(...args);
		this.state = {

		};
	}

	render() {
		return (
			<div id="ForgottenPasswordPage">
				<h1 className="text-center">ForgottenPasswordPage</h1>
			</div>
		);
	}
}
