import React, { Component } from 'react';


export default class CenteredSection extends Component {

	render() {
        const { children } = this.props;
		return (
			<div className="hort-center vert-center">
                {children}
			</div>
		);
	}
}
