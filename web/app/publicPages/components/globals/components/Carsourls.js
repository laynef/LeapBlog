import React, { Component } from 'react';
import { connect } from 'react-redux';


@connect((state) => ({
	user: state.user.login.data,
}))

export default class Carsourls extends Component {

	constructor(...args) {
		super(...args);
		this.state = {

		};
	}

	render() {
		return (
			<div id="Carsourls">
				<h1 className="text-center">Carsourls</h1>
			</div>
		);
	}
}
