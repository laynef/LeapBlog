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
			<div className="w-100 f-column m-2">
                <h1 className="text-muted h4">{title}</h1>
                <div className="card card-shadow">
                    {description && (
                        <p className="pl-2 pr-2 pt-3 text-center">{description}</p>
                    )}
                    {children}
                </div>
			</div>
		);
    }

}
