import React, { Component } from 'react';
import { connect } from 'react-redux';


@connect((state) => ({
	user: state.user.login.data,
}))

export default class ProfilePage extends Component {

	constructor(...args) {
		super(...args);
		this.state = {

		};
	}

	render() {
		return (
			<div id="ProfilePage">
				<h1 className="text-center">ProfilePage</h1>
			</div>
		);
	}
}
