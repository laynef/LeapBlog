import React, { Component } from 'react';
import { connect } from 'react-redux';


@connect((state) => ({
	user: state.user.login.data,
}))

export default class SuggestionsPage extends Component {

	constructor(...args) {
		super(...args);
		this.state = {

		};
	}

	render() {
		return (
			<div id="SuggestionsPage">
				<h1 className="text-center">SuggestionsPage</h1>
			</div>
		);
	}
}
