import React, { Component } from 'react';


export default class TextCard extends Component {

	constructor(...args) {
		super(...args);
		this.state = {

		};
	}

	render() {
        const { title, description } = this.props;
		return (
			<div className="card w-100 m-2 p-3">
				<h1 className="h3">{title}</h1>
				<h1 className="h6">{description}</h1>
			</div>
		);
	}
}
