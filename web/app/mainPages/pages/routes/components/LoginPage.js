import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
    HeaderSection,
    TopTitleCard,
    TwoGrid,
} from '../../../components/globals';
import { Form, Field, reduxForm } from 'redux-form';
import { renderInput } from '../../../../redux/utils';
import { Link } from 'react-router-dom';
import {
    Button,
} from 'reactstrap';


@connect((state) => ({
	user: state.user.login.data,
}))

@reduxForm({
    form: 'LoginPage',
})

export default class LoginPage extends Component {

	constructor(...args) {
		super(...args);
		this.state = {

		};
    }

    handleSignUpSubmit() {

    }

    handleLoginSubmit() {

    }

	render() {
        const { handleSubmit } = this.props;
		return (
			<div id="LoginPage">
                <HeaderSection
                    title="Welcome to Leap Blog"
                    description="If you don't have an account with us. Please sign up and we'll quickly leap you into your first blog"
                />
                <TwoGrid
                    FirstCardComponent={(
                        <TopTitleCard title="Sign Up" description="Are you a new member? Get started here">
                            <Form className="p-3" onSubmit={handleSubmit(this.handleSignUpSubmit.bind(this))} action={null}>
                                <Field placeholder="Enter email" classNameOuter="f-column" classNameInput="w-100" component={renderInput} label="Email" name="sign-up-email" />
                                <Field text="password" placeholder="Enter password" classNameOuter="f-column" classNameInput="w-100" component={renderInput} label="Password" name="sign-up-password" />
                                <Field text="password" placeholder="Enter confirm password" classNameOuter="f-column" classNameInput="w-100" component={renderInput} label="Confirm password" name="sign-up-repassword" />
                                <Button type="submit" className="w-100 mt-2 btn-outline-secondary">Sign Up</Button>
                            </Form>
                        </TopTitleCard>
                    )}
                    SecondCardComponent={(
                        <TopTitleCard title="Login" description="Already have an account? Login here">
                            <Form className="pl-3 pr-3 pb-2" onSubmit={handleSubmit(this.handleLoginSubmit.bind(this))} action={null}>
                                <Field placeholder="Enter email" classNameOuter="f-column" classNameInput="w-100" component={renderInput} label="Email" name="login-email" />
                                <Field text="password" placeholder="Enter password" classNameOuter="f-column" classNameInput="w-100" component={renderInput} label="Password" name="login-password" />
                                <Link className="w-100" to={`/${process.env.BASE_MAIN_URL}/forgotten/password`}>Forgot your password? Click here</Link>
                                <Button type="submit" className="w-100 mt-2 btn-outline-secondary">Login</Button>
                            </Form>
                        </TopTitleCard>
                    )}
                />
			</div>
		);
	}

}
