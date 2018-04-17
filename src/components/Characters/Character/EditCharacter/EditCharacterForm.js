import React, {Component} from 'react';
import {connect} from "react-redux";
import {addCharacter} from "../../../../redux/actions";
import {Formik} from 'formik';
import InputFields from '../../../UI/Input/InputFields';
import CharacterBuilder from '../CharacterBuilder';

const mapDispatchToProps = dispatch => {
    return {
        addCharacter: character => dispatch(addCharacter(character))
    };
};

class EditCharacterForm extends Component {
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
    // this.handleChange = this
    //     .handleChange
    //     .bind(this);
    // this.handleSubmit = this
    //     .handleSubmit
    //     .bind(this);
    // }
}


componentDidMount() {
    this.setState({
        name: this.props.character.name
    })
};
    
  handleChange(event) {
    // (event.target.id === 'experience' ? console.log("Hi") : null);
    if (event.target.value !== '' || event.target.value > 0) {
      this.setState({
        [event.target.id]: event.target.type === 'number'
          ? parseInt(event.target.value, 10)
          : event.target.value
      });
    }
  }

  handleBlur = (event) => {
    if (event.target.id === 'experience') {
      // console.log(CharacterBuilder.getLevelFromExp(event.target.value))
      this.setState({
        level: CharacterBuilder.getLevelFromExp(event.target.value)
      })
    }
  }

    render() {
  
        const {
            name,
            charClass,
            experience,
            level,
            gold,
            perks,
            checkmarks
        } = this.state;
        return (
            <div>
                <h1>Editing {name}</h1>
                <Formik
                    initialValues={{
                    name: "",
                    charClass: "",
                    experience: 0,
                    level: 0,
                    gold: 0,
                    perks: 0,
                    checkmarks: 0,
                    description: ""
                }}
                    onSubmit={(values, actions) => {
                    setTimeout(() => {
                        alert(JSON.stringify(values, null, 2));
                        actions.setSubmitting(false);
                    }, 1000);
                }}
                    render={props => (
                    <form onSubmit={props.handleSubmit}>
                        <InputFields
                            fieldtype='name'
                            setid={"name"}
                            value={name}
                            placeholder="Cool name"
                            label="Some Kewl Name"
                            onchange={this.handleChange}/>
                        <InputFields
                            fieldtype='select'
                            setid={"charClass"}
                            value={charClass}
                            placeholder="Character Class"
                            label="Character Class"
                            onchange={this.updateDescription}/>
                        <InputFields
                            fieldtype='number'
                            setid={"experience"}
                            value={experience}
                            label="Experience"
                            placeholder={0}
                            onchange={this.handleChange}
                            onblur={this.handleBlur}/>
                        <InputFields
                            fieldtype='number'
                            setid={"level"}
                            value={level}
                            label="Current Level"
                            onchange={this.handleChange}/>
                        <InputFields
                            fieldtype='number'
                            setid={"gold"}
                            value={gold}
                            label="Gold"
                            onchange={this.handleChange}/>
                        <InputFields
                            fieldtype='number'
                            setid={"perks"}
                            value={perks}
                            label="Perks"
                            onchange={this.handleChange}/>
                        <InputFields
                            fieldtype='number-restriction'
                            setid={"checkmarks"}
                            value={checkmarks}
                            label="Perk Progress"
                            onchange={this.handleChange}
                            min="0"
                            max="18"/> {props.errors.name && <div id="feedback">{props.errors.name}</div>}
                        <button type="submit">Submit</button>
                    </form>
                )}/>
            </div>
        );

    }
}
const EditCharForm = connect(null, mapDispatchToProps)(EditCharacterForm)
export default EditCharForm;