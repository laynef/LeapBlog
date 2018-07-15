import React, { Component } from 'react';
import { renderRoutes } from 'react-router-config';
import {
    Header,
} from '../../globals';


export default class MasterPage extends Component {

	render() {
		const { route, location } = this.props;

		return (
			<div className="app">
                <Header path={location && location.pathname ? location.pathname : null} />
                <section>
                    {renderRoutes(route.routes)}
                </section>
			</div>
		);
	}

}
