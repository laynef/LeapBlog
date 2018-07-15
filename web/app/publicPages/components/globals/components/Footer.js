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
				<div className="w-100 f-sa m-2">
                    <a className="h5 text-center w-33" href={`/${process.env.BASE_API_URL}/docs`}>API Docs</a>
                    <a className="h5 text-center w-33" href={`mailto:laynefaler@gmail.com`}>Contact</a>
                    <a className="h5 text-center w-33" href={`/`}>Other Frameworks</a>
                </div>
                <div className="w-50 f-sa">
                    <a className="hort-center" target="_blank" href="https://www.linkedin.com/in/laynefaler/"><i className="fa fa-linkedin" /></a>
                    <a className="hort-center" target="_blank" href="https://github.com/laynef/LeapBlogger"><i className="fa fa-github" /></a>
                    <a className="hort-center" target="_blank" href="http://www.manoftech.com/"><i className="fa fa-cog" /></a>
                </div>
			</footer>
		);
	}
}
