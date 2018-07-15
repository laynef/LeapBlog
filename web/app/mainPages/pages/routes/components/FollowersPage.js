import React, { Component } from 'react';
import { connect } from 'react-redux';


@connect((state) => ({
	user: state.user.login.data,
}))

export default class FollowersPage extends Component {

	constructor(...args) {
		super(...args);
		this.state = {

		};
	}

	render() {
		return (
			<div id="FollowersPage">
				<h1 className="text-center">FollowersPage</h1>
			</div>
		);
	}
}
