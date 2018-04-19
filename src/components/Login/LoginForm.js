import React, { Component } from 'react';
import { FormControl } from 'material-ui/Form';
import InputFields from '../UI/Input/InputFields';
import Button from '../UI/Button/RaisedButton';
import Util from '../../util/Util';
import firebase from 'firebase';
import ErrorLabel from '../UI/Errors/ErrorLabel';
import Loading from '../UI/Loading/Loading';
import { withFormik } from 'formik';
import { InputLabel } from 'material-ui/Input'
import { withRouter } from "react-router-dom";
const container = (
    withRouter,
    withFormik({
        mapPropsToValues: props => ({
            email: props.email,
            password: props.password
        }),
    
        validate: (values, props) => {
            const errors = {};
            
            if (!values.email) {
                errors.email = "Required";
            }
            else if (!Util.isValidEmail(values.email)) {
                errors.email = "Invalid email address";
            }
    
            return errors;
        },
    
        handleSubmit: (values, { props, setSubmitting, setErrors, resetForm }) => {
            try {
                console.log("Clicked", values);
                firebase.auth().signInWithEmailAndPassword(values.email, values.password);
                props.history.push('/')
            }
            catch (e) {
                setSubmitting(false);
                setErrors({ login: 'Information does not match' });
            }
        }
    })
);

class LoginForm extends Component {

componentDidMount() {
    console.log(this.props.history)
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
            <React.Fragment>
                <ErrorLabel error={errors.register} color='#D50000' />
                <form style={this.props.style} className="register-form" onSubmit={handleSubmit}>
                    <InputFields
                        label="Email"
                        fieldtype="name"
                        name="email"
                        setid={"email"}
                        placeholder="you@yourmail.com"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.email}
                        error={touched.email && errors.email}
                    />{errors.email && touched.email && <div className="input-feedback">{errors.email}</div>}
                    <FormControl >
                        <InputLabel htmlFor="password">Password</InputLabel>
                        <InputFields
                            fieldtype="password"
                            name="password"
                            setid={"password"}
                            placeholder="password"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.password}
                            error={touched.password && errors.password}
                            />{errors.password && touched.password && <div className="input-feedback">{errors.password}</div>}
                    </FormControl>
                    <Button
                        className="auth-button"
                        type="submit"
                        text="LOGIN"
                        styleType="accent"
                    />
                </form>
            </React.Fragment>
        );
    }
}

const EnhancedLoginForm = container(LoginForm);
export default EnhancedLoginForm;