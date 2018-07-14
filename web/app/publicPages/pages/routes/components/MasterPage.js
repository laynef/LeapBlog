import React, { Component } from 'react';
import { renderRoutes } from 'react-router-config';


export default class MasterPage extends Component {

	render() {
		const { route, location, history } = this.props;
		return (
			<div id="PublicPages">
				<div id="PublicChildren">
					{renderRoutes(route.routes)}
				</div>
			</div>
		);
    }

}
