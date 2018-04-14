import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import TextField from 'material-ui/TextField';


const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 200,
  },
  menu: {
    width: 200,
  },
});


class InputFields extends React.Component {
  state = {
  };

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
    });
  };

  componentDidMount() {
    console.log(this.props.fieldtype)
  }

  render() {
    const { classes } = this.props;
    let inputType = null;
    switch (this.props.fieldtype) {
        case ("name"):
            inputType = <TextField
                    id="name"
                    className={classes.textField}
                    placeholder={this.props.placeholder}
                    onChange={this.handleChange('name')}
                    margin="normal"
                />
            break;
        case ("required"):
        inputType = <TextField
                required
                id="required"
                placeholder={this.props.placeholder}
                className={classes.textField}
                margin="normal"
            />
            break;
        case ("password"):
        inputType = <TextField
                id="password-input"
                label={this.props.label}
                className={classes.textField}
                type="password"
                autoComplete="current-password"
                margin="normal"
            />  
            break;
        default:
            inputType =<div></div>
            break;
    }
    return inputType;
  }
}

InputFields.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(InputFields);