import React, { Component } from 'react';
import {
    Carsouels,
} from '../../../components/globals';
import {
    HomePageCarousels as items,
} from '../../data';

export default class HomePage extends Component {

	constructor(...args) {
		super(...args);
		this.state = {

		};
	}

	render() {
		return (
			<div id="HomePage">
                <div className="homepage-carsousel">
                    <Carsouels items={items} />
                </div>
			</div>
		);
	}

}
