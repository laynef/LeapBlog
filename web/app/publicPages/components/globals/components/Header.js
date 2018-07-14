import React, { Component } from 'react';


export default class Header extends Component {

	constructor(...args) {
		super(...args);
		this.state = {

		};
	}

	render() {
		return (
			<header>
				<a href="/"><img src="/assets/img/frog-logo-white.svg" alt="" /></a>
                <div className="top-nav">
                    <a target="_blank" href="https://www.linkedin.com/in/laynefaler/"><i className="fa fa-linkedin" /></a>
                    <a target="_blank" href="https://github.com/laynef/LeapBlogger"><i className="fa fa-github" /></a>
                    <a target="_blank" href="http://www.manoftech.com/"><i className="fa fa-cog" /></a>
                    <a href={`/${process.env.BASE_MAIN_URL}/login`}>Sign Up | Login</a>
                </div>
			</header>
		);
	}
}
