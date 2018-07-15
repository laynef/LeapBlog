import React, { Component } from 'react';
import { connect } from 'react-redux';


@connect((state) => ({
	user: state.user.login.data,
}))

export default class DashboardPage extends Component {

	constructor(...args) {
		super(...args);
		this.state = {

		};
	}

	render() {
		return (
			<div id="DashboardPage">
				<h1 className="text-center">DashboardPage</h1>
			</div>
		);
	}
}
