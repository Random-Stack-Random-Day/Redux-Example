import React, {Component} from 'react';
import InputFields from '../../../UI/Input/InputFields';
import {compose} from 'redux';
import {connect} from "react-redux";
import {logACharacterPlaySession} from "../../../../redux/actions";
import {FormControl, FormHelperText} from 'material-ui/Form';
import {withFormik} from 'formik';
import {withStyles} from 'material-ui/styles';

import Yup from 'yup';
import uuid from 'uuid/v4';
import CharacterBuilder from '../CharacterBuilder'
import {InputLabel} from 'material-ui';

const mapDispatchToProps = dispatch => {
    return {
        logACharacterPlaySession: character => dispatch(logACharacterPlaySession(character))
    };
};

const styles = theme => ({
    container: {
        display: 'flex',
        alignContent: 'flex-start'
    },
    formControl: {
        margin: theme.spacing.unit
    }
});

const container = compose(connect(null, mapDispatchToProps), withStyles(styles), withFormik({
    mapPropsToValues: props => ({
        name: props.character.name,
        experience: props.character.experience,
        charClass: props.character.charClass,
        level: props.character.level,
        gold: props.character.gold,
        perks: props.character.perks,
        checkmarks: props.character.checkmarks,
        characterId: props.charId,
        tempChecks: 0
    }),
    validationSchema: Yup
        .object()
        .shape({
            name: Yup
                .string()
                .required(`Don't you want a name bro?`),
            experience: Yup
                .number()
                .required(`Even a 0 is a number`)
                .min(0, `Can only go up from here`)
                .max(500, `Bro, enough already. RETIRE ALREADY!`),
            gold: Yup
                .number()
                .required(`You're broke, sure, but 0 is still a number`)
                .min(0, `You're broke, sure, but 0 is still a number`),
            tempChecks: Yup
                .number()
                .max(2, "You did NOT just get 3 checkmarks...!")
        }),

    handleSubmit: (values, {props, setSubmitting, setErrors, resetForm}) => {
        values.level = CharacterBuilder.getLevelFromExp(values.experience);
        values.checkmarks = CharacterBuilder.checkPerkStatus(props.character.checkmarks, values.tempChecks)
        props.onFlipHandler();
        props.logACharacterPlaySession(values)
        setTimeout(() => {resetForm()}, 500);
    }
}));

class LogSessionForm extends Component {
    // componentDidMount() {     console.log(this.props.character) }

    render() {
        const {classes} = this.props;
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
            <div className={classes.container}>
                <form onSubmit={handleSubmit}>
                    <h2>Editing: {values.name} 
                        the {values.charClass}</h2>
                    <br/>
                    <InputFields
                        fieldtype="number"
                        label="Experience"
                        name="experience"
                        setid="charExperience"
                        value={values.experience}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={touched.experience && errors.experience}/>
                    <InputFields
                        label="Gold"
                        fieldtype="number"
                        name="gold"
                        value={values.gold}
                        onChange={handleChange}
                        onBlur={handleBlur}/> {errors.gold && touched.gold && <div className="input-feedback">{errors.gold}</div>}
                    <InputFields
                        label="Perk Progress"
                        fieldtype="number"
                        name={"tempChecks"}
                        value={values.tempChecks}
                        onChange={handleChange}
                        onBlur={handleBlur}/> {errors.tempChecks && touched.tempChecks && <div className="input-feedback">{errors.tempChecks}</div>}
                    <br/>
                    <button type="button" onClick={() => this.props.onFlipHandler()}>Cancel</button>
                    <button type="submit">Submit</button>
                </form>
            </div>
        );
    }

};

const EnhancedLogSessionForm = container(LogSessionForm)
export default EnhancedLogSessionForm;
