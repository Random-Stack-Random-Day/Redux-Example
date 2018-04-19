import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import TextField from 'material-ui/TextField';
import IconButton from 'material-ui/IconButton';
import Input, { InputAdornment } from 'material-ui/Input';
import MenuItem from 'material-ui/Menu/MenuItem';
import Visibility from 'material-ui-icons/Visibility';
import VisibilityOff from 'material-ui-icons/VisibilityOff';


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
    password: '',
    showPassword: false
  };

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
    });
  };

  handleMouseDownPassword = event => {
    event.preventDefault();
  };

  handleClickShowPassword = () => {
    this.setState({ showPassword: !this.state.showPassword });
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
                    onChange={this.props.onChange}
                    onBlur={this.props.onBlur}
                />
        case ("required"):
        return <TextField
                required
                id={this.props.setid}
                name={this.props.name}
                placeholder={this.props.placeholder}
                className={classes.textField}
                margin="normal"
            />
        case ("password"):
      return  <Input
                id="password"
                label="Passowrd"
                type={this.state.showPassword ? 'text' : 'password'}
                value={this.props.value}
                onChange={this.props.onChange}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="Toggle password visibility"
                      onClick={this.handleClickShowPassword}
                      onMouseDown={this.handleMouseDownPassword}
                    >
                      {this.state.showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
              />
      case ("number"):
      return <TextField
                    id={this.props.setid}
                    label={this.props.label}
                    value={this.props.value}
                    name={this.props.name}
                    onChange={this.props.onChange}
                    type="number"
                    InputLabelProps={{
                      shrink: true,
                    }}
                    className={classes.textField}
                    onBlur={this.props.onBlur ? this.props.onBlur : null}
                  />
      case ("number-restriction"):
      return <TextField
                    id={this.props.setid}
                    label={this.props.label}
                    value={this.props.value}
                    onChange={this.props.onChange}
                    name={this.props.name}
                    onBlur={this.props.onBlur}
                    type="number"
                    InputProps={
                      {inputProps: {
                        min: this.props.min, max: this.props.max, id: this.props.setid
                      }}
                    }
                    className={classes.textField}
                  />
      case ("disabled"):
      return <Input 
                id={this.props.setid} 
                value={this.props.value} 
                onChange={this.props.onChange}
                onBlur={this.props.onBlur}
                name={this.props.name}
                />

      case ("select"):
      return <TextField
                  id={this.props.setid}
                  select
                  className={classes.textField}
                  value={this.props.value}
                  onChange={this.props.onChange}
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