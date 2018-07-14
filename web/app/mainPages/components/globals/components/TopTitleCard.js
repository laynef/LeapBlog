import React, { Component } from 'react';


export default class TopTitleCard extends Component {

	constructor(...args) {
		super(...args);
		this.state = {

		};
	}

	render() {
        const { title, description, children } = this.props;
		return (
			<div className="w-100 f-column">
                <h1>{title}</h1>
                <div className="card card-shadow">
                    {description && (
                        <p className="p-2">{description}</p>
                    )}
                    {children}
                </div>
			</div>
		);
    }

}
