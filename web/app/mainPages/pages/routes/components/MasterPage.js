import React, { Component } from 'react';
import { renderRoutes } from 'react-router-config';


export default class MasterPage extends Component {

	render() {
		const { route } = this.props;

		return (
			<div className="app">
				<div className="below-header">
                    {renderRoutes(route.routes)}
				</div>
			</div>
		);
	}

}
