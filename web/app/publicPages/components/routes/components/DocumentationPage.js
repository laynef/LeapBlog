import React, { Component } from 'react';
import { connect } from 'react-redux';


@connect((state) => ({
	user: state.user.login.data,
}))

export default class DocumentationPage extends Component {

	constructor(...args) {
		super(...args);
		this.state = {

		};
	}

	render() {
		return (
			<div>
				<h1 className="text-center">API Documentation</h1>
			</div>
		);
	}
}
