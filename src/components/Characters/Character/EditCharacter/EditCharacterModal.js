import React from 'react';
import PropTypes from 'prop-types';
import Portal from 'material-ui/Portal';
import Button from 'material-ui/Button';
import Typography from 'material-ui/Typography';
import { withStyles } from 'material-ui/styles';
// import EditCharacterForm from './EditCharacterForm';
import NEWEditCharForm from './NEW_CharacterEditForm';

const styles = theme => ({
  alert: {
    padding: theme.spacing.unit,
    margin: `${theme.spacing.unit}px 0`,
    border: '1px solid',
    borderColor: theme.palette.text.primary,
  },
});

class EditCharacterModal extends React.Component {
  state = {
    show: false,
  };

  componentDidMount() {
    console.log(this.props);
  }
  

  handleClick = () => {
    this.setState({ show: !this.state.show });
  };

  container = null;

  render() {
    const { classes } = this.props;
    const { show } = this.state;
    return (
      <div>
        <Button onClick={this.handleClick}>{show ? 'Cancel Edit' : 'Edit Character'}</Button>
        {show ? (
            <Portal container={this.container}>
              {/* <EditCharacterForm character={this.props.character}/> */}
              <NEWEditCharForm charId={this.props.charId} character={this.props.character}/>
            </Portal>
          ) : null}
        <div
          ref={node => {
            this.container = node;
          }}
        />
      </div>
    );
  }
}

EditCharacterModal.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(EditCharacterModal);