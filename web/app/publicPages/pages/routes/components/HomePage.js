import React, { Component } from 'react';
import {
    Carsouels,
    HeaderSection,
    TwoGrid,
    TextCard,
    DisplayCard,
    Header,
    Footer,
} from '../../../components/globals';
import {
    HomePageCarousels as items,
    HomePageSections as sections,
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
                <Header />
                {sections.map((e, i) => (
                    <div className="p-5" key={i}>
                        <HeaderSection
                            title={e.header_title}
                            description={e.header_description}
                        />
                        <TwoGrid
                            FirstCardComponent={
                                <TextCard
                                    title={e.first_card_title}
                                    description={e.first_card_description}
                                />
                            }
                            SecondCardComponent={
                                <DisplayCard src="" />
                            }
                        />
                    </div>
                ))}
                <Footer />
			</div>
		);
	}

}
