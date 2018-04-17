import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Grid from 'material-ui/Grid';
import { compose } from 'redux';
import { connect } from 'react-redux';

import CharacterCards from './CharacterCards';
import CreateCharacterModal from './Character/CreateCharacter/CreateCharacterModal';
import NewModal from './Character/EditCharacter/NEW_CreateCharacterModal';
import NEWCard from './NEW_CharacterCards'

const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing.unit * 2,
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
});

class Characters extends Component {

  doubleClickHandler = (character) => {
    console.log("Double Click Initiated", character)
  }
  render() {
    const { classes } = this.props;
        return (
            <div className={classes.root}>

            {/* <NewModal /> */}
            {/* <NEWCard /> */}
            <CreateCharacterModal />
            <Grid container spacing={24}>
                    {Object.keys(this.props.characters)
                                    .map((k,index) => {
                                        // return <li key={index}>{props.characters[k].name}</li>
                                        return <Grid item xs={6} sm={3} key={index}> <NEWCard 
                                        character={this.props.characters[k]}
                                        // name = {this.props.characters[k].name}
                                        // charClass={this.props.characters[k].charClass}
                                        // level={this.props.characters[k].level} 
                                        displayMe={k}
                                        // perkProgress={this.props.characters[k].checkmarks}
                                        // experience={this.props.characters[k].experience}
                                        onDoubleClick={(character) => this.doubleClickHandler(character)}
                                        />
                                        </Grid>
                                    })
                                }
            </Grid>
            </div>
        );
    }
}

Characters.propTypes = {
  classes: PropTypes.object.isRequired,
};
const mapStateToProps = state => {
    return { characters: state.characters };
}

export default compose(connect(mapStateToProps), withStyles(styles))(Characters)