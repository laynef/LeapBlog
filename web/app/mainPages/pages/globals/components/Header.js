import React, { Component } from 'react';
import { connect } from 'react-redux';
import paths from '../../../../utils';


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
        const { user, path } = this.props;
		return (
			<header>
                <a href="/">
                    <img src="/assets/img/frog-logo-white.svg" alt="" />
                </a>
                {user && user.id ? (
                    <a href={`/${process.env.BASE_MAIN_URL}/dashboard`}>
                        Dashboard
                    </a>
                ) : !!paths[path] ? (
                    <a href={`/${process.env.BASE_MAIN_URL}/login`}>
                        Sign Up | Login
                    </a>
                ) : (
                    <a href={`/${process.env.BASE_API_URL}/docs`}>
                        View API Docs
                    </a>
                )}
			</header>
		);
	}
}
