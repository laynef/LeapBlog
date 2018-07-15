import React, { Component } from 'react';
import { connect } from 'react-redux';


@connect((state) => ({
	user: state.user.login.data,
}))

export default class DetailsProfilePage extends Component {

	constructor(...args) {
		super(...args);
		this.state = {

		};
	}

	render() {
		return (
			<div id="DetailsProfilePage">
				<h1 className="text-center">DetailsProfilePage</h1>
			</div>
		);
	}
}
