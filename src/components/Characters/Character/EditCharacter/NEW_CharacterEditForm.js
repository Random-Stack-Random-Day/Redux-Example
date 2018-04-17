import React, {Component} from 'react';
import InputFields from '../../../UI/Input/InputFields';
import { FormControl } from 'material-ui/Form';
import {withFormik} from 'formik';
import Yup from 'yup';
import uuid from 'uuid/v4';

class NEW_CharacterEditForm extends Component {
    
    componentDidMount() {
        console.log(this.props.character)
    }

    handleDoubleClick = () => {
        console.log("Double click active")
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
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={touched.name && errors.name}
                    /> 
                        {errors.name && touched.name && <div className="input-feedback">{errors.name}</div>}
                    <InputFields
                        label="Experience"
                        fieldtype="number"
                        name="experience"
                        value={values.experience}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={touched.experience && errors.experience}
                    /> 
                    <FormControl disabled>
                        <InputFields
                            label="Chararcter Class"
                            fieldtype="disabled"
                            name="charClass"
                            value={values.charClass}
                            setid={"charClass-disabled"}
                            onChange={handleChange}
                            onBlur={handleBlur}
                        />
                    </FormControl>
                    <InputFields
                        label="Gold"
                        fieldtype="number"
                        name="gold"
                        value={values.gold}
                        onChange={handleChange}
                        onBlur={handleBlur}
                    />
                        {errors.gold && touched.gold && <div className="input-feedback">{errors.gold}</div>}
                    <button type="submit">Submit</button>
                </form>
            </div>
        );
    }

};

export default withFormik({
    mapPropsToValues: props => ({
        name: props.character.name, 
        experience: props.character.experience,
        charClass: props.character.charClass,
        level: props.character.level,
        gold: props.character.gold,
        perks: props.character.perks,
        checkmarks: props.character.perkProgress

    }),

    validationSchema: Yup
        .object()
        .shape({
            name: Yup
                .string()
                .required(`Don't you want a name bro?`),
            experience: Yup.number().required(`Even a 0 is a number`).min(0, `Can only go up from here`).max(500, `Bro, enough already. RETIRE ALREADY!`),
            gold: Yup.number().required(`You're broke, sure, but 0 is still a number`).min(0, `You're broke, sure, but 0 is still a number`)
        }),

    handleSubmit: (values, {props, setSubmitting, setErrors}) => {
        console.log(values);
    }

})(NEW_CharacterEditForm);
