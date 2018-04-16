import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import TextField from 'material-ui/TextField';
import MenuItem from 'material-ui/Menu/MenuItem';


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

  render() {
    const charClasses = [
      {
        value: "Mindthief",
        label: "MND"
      },
      {
        value: "Tinkerer",
        label: "TKR"
      }
    ];

    const { classes } = this.props;
    switch (this.props.fieldtype) {
        case ("name"):
            return <TextField
                    id={this.props.setid}
                    className={classes.textField}
                    placeholder={this.props.placeholder}
                    margin="normal"
                    type="text"
                    name={this.props.name}
                    value={this.props.value}
                    onChange={this.props.onchange}
                />
        case ("required"):
        return <TextField
                required
                id={this.props.setid}
                placeholder={this.props.placeholder}
                className={classes.textField}
                margin="normal"
            />
        case ("password"):
        return <TextField
                id={this.props.setid}
                label={this.props.label}
                className={classes.textField}
                type="password"
                autoComplete="current-password"
                margin="normal"
            />  
      case ("number"):
      return <TextField
                    id={this.props.setid}
                    label={this.props.label}
                    value={this.props.value}
                    onChange={this.props.onchange}
                    type="number"
                    InputLabelProps={{
                      shrink: true,
                    }}
                    className={classes.textField}
                    onBlur={this.props.onblur ? this.props.onblur : null}
                  />
      case ("number-restriction"):
      return <TextField
                    id={this.props.setid}
                    label={this.props.label}
                    value={this.props.value}
                    onChange={this.props.onchange}
                    type="number"
                    InputProps={
                      {inputProps: {
                        min: this.props.min, max: this.props.max
                      }}
                    }
                    className={classes.textField}
                  />
      case ("select"):
      return <TextField
                  id={this.props.setid}
                  select
                  className={classes.textField}
                  value={this.props.value}
                  onChange={this.props.onchange}
                  SelectProps={{
                    MenuProps: {
                      className: classes.menu,
                    },
                  }}
                  helperText="Please select your class"
                  margin="normal"
            >
              {charClasses.map(option => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>


        default:
            return <div></div>
    }
  }
}

InputFields.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(InputFields);