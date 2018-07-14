import React, { Component } from 'react';


export default class Footer extends Component {

	constructor(...args) {
		super(...args);
		this.state = {

		};
	}

	render() {
		return (
			<footer>
				<h1 className="text-center h4">Leap Blog</h1>
                <div className="w-25 f-sb">
                    <a target="_blank" href="https://www.linkedin.com/in/laynefaler/"><i className="fa fa-linkedin" /></a>
                    <a target="_blank" href="https://github.com/laynef/LeapBlogger"><i className="fa fa-github" /></a>
                    <a target="_blank" href="http://www.manoftech.com/"><i className="fa fa-cog" /></a>
                </div>
			</footer>
		);
	}
}
