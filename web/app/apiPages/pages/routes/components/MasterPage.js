import React, { Component } from 'react';
import { renderRoutes } from 'react-router-config';
import { connect } from 'react-redux';
import { __CLIENT__ } from '../../../../utils';


@connect((state) => ({
	user: state.user.login.data,
}))

export default class MasterPage extends Component {

	componentDidMount() {
		const { history, location } = this.props;
		const regex = new RegExp(`/${process.env.BASE_API_URL}/`, 'ig');
	}

	render() {
		const { route, history, user, modal } = this.props;

		const location = history.location ? history.location : {};
		const pathname = location.pathname ? location.pathname : null;

		return (
			<div className="app">
				<div className="below-header">
                    <div className={user && user.user_id ? `children col-xs-12 col-sm-12 col-md-9 col-lg-10` : "children col-xs-12 col-sm-12 col-md-12 col-lg-12 p-0"}>
                        {renderRoutes(route.routes)}
                    </div>
				</div>
			</div>
		);
	}

}
