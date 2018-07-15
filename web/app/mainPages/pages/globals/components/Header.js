import React, { Component } from 'react';
import { connect } from 'react-redux';
import paths from '../../../../utils';
import { Link } from 'react-router-dom';


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
                {user && user.id ? (
                    <div className="">
                        <a href="/">
                            <img src="/assets/img/frog-logo-white.svg" alt="" />
                        </a>
                        <Link to={`/${process.env.BASE_MAIN_URL}/blog`}>
                            Blogs
                        </Link>
                        <Link to={`/${process.env.BASE_MAIN_URL}/followers`}>
                            Followers
                        </Link>
                    </div>
                ) : (
                    <a href="/">
                        <img src="/assets/img/frog-logo-white.svg" alt="" />
                    </a>
                )}
                {user && user.id ? (
                    <Link to={`/${process.env.BASE_MAIN_URL}/dashboard`}>
                        Dashboard
                    </Link>
                ) : !!paths[path] ? (
                    <Link to={`/${process.env.BASE_MAIN_URL}/login`}>
                        Sign Up | Login
                    </Link>
                ) : (
                    <a href={`/${process.env.BASE_API_URL}/docs`}>
                        View API Docs
                    </a>
                )}
			</header>
		);
	}
}
