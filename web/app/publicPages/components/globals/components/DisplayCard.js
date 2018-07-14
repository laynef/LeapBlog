import React, { Component } from 'react';
import { connect } from 'react-redux';


@connect((state) => ({
	user: state.user.login.data,
}))

export default class DisplayCard extends Component {

	constructor(...args) {
		super(...args);
		this.state = {

		};
	}

	render() {
		return (
			<div id="DisplayCard">
				<h1 className="text-center">DisplayCard</h1>
			</div>
		);
	}
}
