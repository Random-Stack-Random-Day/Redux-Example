import React, {Component} from 'react';
import InputFields from '../../../UI/Input/InputFields';
import {withFormik} from 'formik';
import Yup from 'yup';
import uuid from 'uuid/v4';

class NEW_CharacterEditForm extends Component {
    constructor() {
        super();
        this.state = {
            name: "",
            charClass: "",
            experience: 0,
            level: 0,
            gold: 0,
            perks: 0,
            checkmarks: 0,
            description: ""
        };
    }

componentDidMount() {
    console.log(this.props.character)
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

        return (
            <div>
                <form onSubmit={handleSubmit}>
                    <InputFields
                        label="Some Kewl Name"
                        fieldtype="name"
                        name="name"
                        value={values.name}
                        setid={values.name}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={touched.name && errors.name}/> 
                        {errors.name && touched.name && <div className="input-feedback">{errors.name}</div>}
                    <InputFields
                        label="Experience"
                        fieldtype="number-restriction"
                        name="experience"
                        value={values.experience}
                        setid={uuid()}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={touched.experience && errors.experience}
                    /> 
                        {errors.experience && touched.experience && <div className="input-feedback">{errors.experience}</div>}
                    <button type="submit">Submit</button>
                </form>
            </div>
        );
    }

};

export default withFormik({
    mapPropsToValues: props => ({name: props.character.name, experience: props.character.experience}),

    validationSchema: Yup
        .object()
        .shape({
            name: Yup
                .string()
                .required(`Don't you want a name bro?`),
            experience: Yup.number().required(`Even a 0 is a number`).min(0, `Can only go up from here`).max(500, `Bro, enough already. RETIRE ALREADY!`)
        }),

    handleSubmit: (values, {props, setSubmitting, setErrors}) => {
        console.log(values);
    }

})(NEW_CharacterEditForm);
