import React, { Component } from 'react';
import { renderRoutes } from 'react-router-config';
import { Header } from '../../globals';


export default class MasterPage extends Component {

	render() {
		const { route } = this.props;

		return (
			<div className="app">
                <Header />
                <section>
                    {renderRoutes(route.routes)}
                </section>
			</div>
		);
	}

}
