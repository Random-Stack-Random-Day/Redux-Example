import React, { Component } from 'react';
import Input from '../UI/Input/Input';
import Button from '../UI/Button/RaisedButton';
import Util from '../../util/Util';
import firebase from 'firebase';
import ErrorLabel from '../UI/Errors/ErrorLabel';
import Loading from '../UI/Loading/Loading';
import { withFormik } from 'formik';

class Register extends Component {

    componentWillMount() {
        console.log(this.props);
    }

    render() {
        const {
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            handleSubmit,
            isSubmitting
        } = this.props;

        if (isSubmitting) return <Loading />;

        return (
            <div className="form-container">
                <header className="register-header" style={{ display: "flex", alignItems: "center", width: '80%' }}>
                    <h2 style={{ color: "#5a5a5a", fontWeight: 300 }}>Back to Login</h2>
                </header>

                <ErrorLabel error={errors.register} color='#D50000' />
                <form style={this.props.style} className="register-form" onSubmit={handleSubmit}>
                    <Input
                        label="Email"
                        type="email"
                        name="email"
                        placeholder="you@yourmail.com"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.email}
                        error={touched.email && errors.email}
                    />

                    <Input
                        label="Password"
                        type="password"
                        name="password"
                        placeholder="password"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.password}
                    />

                    <Input
                        label="Password confirm"
                        type="password"
                        name="passwordConfirm"
                        placeholder="password confirm"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.passwordConfirm}
                        error={touched.passwordConfirm && errors.passwordConfirm}
                    />

                    <Button
                        className="auth-button"
                        type="submit"
                        text="REGISTER"
                        styleType="accent"
                    />
                </form>
            </div>
        );
    }
}

export default withFormik({
    mapPropsToValues: props => ({
        email: props.email,
        password: props.password,
        passwordConfirm: props.passwordConfirm
    }),

    validate: (values, props) => {
        const errors = {};
        
        if (!values.email) {
            errors.email = "Required";
        }
        else if (!Util.isValidEmail(values.email)) {
            errors.email = "Invalid email address";
        }

        if (values.passwordConfirm !== values.password) {
            errors.passwordConfirm = "Passwords do not match";
        }

        return errors;
    },

    handleSubmit: async (values, { props, setSubmitting, setErrors, resetForm }) => {
        try {
            await firebase.auth().createUserWithEmailAndPassword(values.email, values.password);
            props.history.push('/');
        }
        catch (e) {
            setSubmitting(false);
            setErrors({ register: 'Email already in use' });
        }
    }
})(Register);