import React, { Component } from 'react';


export default class TwoGrid extends Component {

	constructor(...args) {
		super(...args);
		this.state = {

		};
	}

	render() {
        const { FirstCardComponent, SecondCardComponent } = this.props;
		return (
			<div className="w-100 respond-row p-2">
                {FirstCardComponent}
                {SecondCardComponent}
			</div>
		);
	}
}
