import React, { Component } from 'react';
import { connect } from 'react-redux';


export default class PublicPage extends Component {

	constructor(...args) {
		super(...args);
		this.state = {

		};
	}

	render() {
		return (
			<div>
				<h1 className="text-center">Redirecting...</h1>
			</div>
		);
	}
}
