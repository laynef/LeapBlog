import React, { Component } from 'react';


export default class HeaderSection extends Component {

	constructor(...args) {
		super(...args);
		this.state = {

		};
	}

	render() {
        const { title, description } = this.props;
		return (
			<div className="w-100 f-column vert-center hort-center p-5">
				<h1 className="h2 text-dark text-center">{title}</h1>
				<h2 className="h5 text-muted text-center">{description}</h2>
			</div>
		);
	}
}
