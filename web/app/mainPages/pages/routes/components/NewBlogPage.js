import React, { Component } from 'react';
import { connect } from 'react-redux';


@connect((state) => ({
	user: state.user.login.data,
}))

export default class NewBlogPage extends Component {

	constructor(...args) {
		super(...args);
		this.state = {

		};
	}

	render() {
		return (
			<div id="NewBlogPage">
				<h1 className="text-center">NewBlogPage</h1>
			</div>
		);
	}
}
