import React, { Component } from "react";
import { connect } from "react-redux";
import { addCharacter } from "../../redux/actions";

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
      charClass: "Tinkerer",
      experience: 130,
      level: 3,
      gold: 90,
      perks: 2,
      checkmarks: 2
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleChange(event) {
    this.setState({ [event.target.id]: event.target.value });
  }
  handleSubmit(event) {
    event.preventDefault();
    const { name, charClass, experience, level, gold, perks, checkmarks } = this.state;
    this.props.addCharacter({ name, charClass, experience, level, gold, perks, checkmarks });
    this.setState({ name: "" });
  }
  render() {
    const { name } = this.state;
    return (
      <form onSubmit={this.handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">name</label>
          <input
            type="text"
            className="form-control"
            id="name"
            value={name}
            onChange={this.handleChange}
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