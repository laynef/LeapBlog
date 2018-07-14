import React, { Component } from 'react';
import MDSpinner from 'react-md-spinner';


export default class Loader extends Component {

	render() {
		return (
			<MDSpinner {...this.props} />
		);
	}

}
