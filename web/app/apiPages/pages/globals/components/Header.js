import React, { Component } from 'react';
import { connect } from 'react-redux';


@connect((state) => ({
	user: state.user.login.data,
}))

export default class Header extends Component {

	constructor(...args) {
		super(...args);
		this.state = {

		};
	}

	render() {
        const { user } = this.props;
		return (
			<header>
                <a href="/">
                    <img src="/assets/img/frog-logo-white.svg" alt="" />
                </a>
                <a href={user && user.id ? `/${process.env.BASE_MAIN_URL}/dashboard` : `/${process.env.BASE_MAIN_URL}/login`}>
                    {user && user.id ? 'Dashboard' : 'Sign Up | Login'}
                </a>
			</header>
		);
	}
}
