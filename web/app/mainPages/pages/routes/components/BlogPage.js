import React, { Component } from 'react';
import { connect } from 'react-redux';


@connect((state) => ({
	user: state.user.login.data,
}))

export default class BlogPage extends Component {

	constructor(...args) {
		super(...args);
		this.state = {

		};
	}

	render() {
		return (
			<div id="BlogPage">
				<h1 className="text-center">BlogPage</h1>
			</div>
		);
	}
}
