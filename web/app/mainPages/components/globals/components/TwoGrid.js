import React, { Component } from 'react';
import { connect } from 'react-redux';


@connect((state) => ({
	user: state.user.login.data,
}))

export default class TwoGrid extends Component {

	constructor(...args) {
		super(...args);
		this.state = {

		};
	}

	render() {
		return (
			<div id="TwoGrid">
				<h1 className="text-center">TwoGrid</h1>
			</div>
		);
	}
}
