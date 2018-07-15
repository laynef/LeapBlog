import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
    CenteredSection,
    HeaderSection,
    TopTitleCard,
} from '../../../components/globals';
import { Form, Field, reduxForm } from 'redux-form';
import { renderInput } from '../../../../redux/utils';
import { Button } from 'reactstrap';


@connect((state) => ({
	user: state.user.login.data,
}))

@reduxForm({
    form: 'ForgottenPasswordPage',
})

export default class ForgottenPasswordPage extends Component {

	constructor(...args) {
		super(...args);
		this.state = {

		};
    }

    submitForgottenPassword() {

    }

	render() {
        const { handleSubmit } = this.props;
		return (
			<div id="ForgottenPasswordPage">
				<HeaderSection
                    title="Forgot Your Password?"
                    description="If you forgot your password, enter your email and a new one will be sent to you. If you'd like to go back to the login page select the link below."
                />
                <CenteredSection>
                    <div className="w-50">
                        <TopTitleCard
                            title="Forgotten Password"
                            description="Please enter your email and a link will be sent to you"
                        >
                            <Form className="p-3" onSubmit={handleSubmit(this.submitForgottenPassword.bind(this))}>
                                <Field component={renderInput} placeholder="Enter email" label="Email" name="email" classNameOuter="f-column" classNameInput="w-100" />
                                <Button className="btn-outline-secondary w-100 mt-3" type="submit">Enter</Button>
                            </Form>
                        </TopTitleCard>
                    </div>
                </CenteredSection>
			</div>
		);
	}
}
