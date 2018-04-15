import React, { Component } from "react";
import { connect } from "react-redux";
import { addCharacter } from "../../../redux/actions";
import InputFields from '../../UI/Input/InputFields';
import CharacterBuilder from './CharacterBuilder';

const mapDispatchToProps = dispatch => {
  return {
    addCharacter: character => dispatch(addCharacter(character))
  };
};

class CharacterForm extends Component {
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

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

handleChange(event) {
  this.setState({ 
    [event.target.id]: event.target.type === 'number' ? parseInt(event.target.value, 10) : event.target.value
  });
}

updateDescription = (event) => {
  const charDescription = CharacterBuilder.fillInProfile('Mindthief');
  console.log(charDescription.description);
  this.setState({ description : charDescription, charClass: event.target.value });
}

handleSubmit(event) {
  event.preventDefault();
  const { name, charClass, experience, level, gold, perks, checkmarks, description } = this.state;
  this.props.addCharacter({ name, charClass, experience, level, gold, perks, checkmarks, description });
  this.setState({ name: "",
  charClass: "Tinkerer",
  experience: 0,
  level: 0,
  gold: 0,
  perks: 0,
  checkmarks: 0,
  description: ""
 });
}
render() {
    const { name, charClass, experience, level, gold, perks, checkmarks } = this.state;
    return (
      <form onSubmit={this.handleSubmit}>
      <button onClick={() => this.testLogger}>Test Me </button>
        <div className="form-group">
          <InputFields 
              fieldtype='name' 
              setid={"name"}
              value={name}
              placeholder="Cool name"
              label="Some Kewl Name"
              onchange={this.handleChange}
            />
            <InputFields 
              fieldtype='select' 
              setid={"charClass"}
              value={charClass}
              placeholder="Character Class"
              label="Character Class"
              onchange={this.updateDescription}
            />
            <InputFields 
              fieldtype='number' 
              setid={"experience"}
              value={experience}
              label="Experience"
              onchange={this.handleChange}
            />
            <InputFields 
              fieldtype='number' 
              setid={"level"}
              value={level}
              label="Current Level"
              onchange={this.handleChange}
            />
            <InputFields 
              fieldtype='number' 
              setid={"gold"}
              value={gold}
              label="Gold"
              onchange={this.handleChange}
            />
            <InputFields 
              fieldtype='number' 
              setid={"perks"}
              value={perks}
              label="Perks"
              onchange={this.handleChange}
            />
            <InputFields 
              fieldtype='number' 
              setid={"checkmarks"}
              value={checkmarks}
              label="Perk Progress"
              onchange={this.handleChange}
            />
        </div>
        <button type="submit" className="btn btn-success btn-lg">
          SAVE
        </button>
      </form>
    );
  }
}
const Form = connect(null, mapDispatchToProps)(CharacterForm);
export default Form;