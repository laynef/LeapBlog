import React, { Component } from 'react';
import { connect } from 'react-redux';


@connect((state) => ({
	user: state.user.login.data,
}))

export default class HeaderSection extends Component {

	constructor(...args) {
		super(...args);
		this.state = {

		};
	}

	render() {
		return (
			<div id="HeaderSection">
				<h1 className="text-center">HeaderSection</h1>
			</div>
		);
	}
}
