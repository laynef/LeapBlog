import React, { Component } from 'react';
import { connect } from 'react-redux';


@connect((state) => ({
	user: state.user.login.data,
}))

export default class TopTitleCard extends Component {

	constructor(...args) {
		super(...args);
		this.state = {

		};
	}

	render() {
		return (
			<div id="TopTitleCard">
				<h1 className="text-center">TopTitleCard</h1>
			</div>
		);
	}
}
