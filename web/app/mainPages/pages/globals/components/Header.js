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
                <a href={`/${process.env.BASE_API_URL}/docs`}>
                    View API Docs
                </a>
			</header>
		);
	}
}
