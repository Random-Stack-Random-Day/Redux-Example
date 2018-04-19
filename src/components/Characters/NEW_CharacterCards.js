import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import classnames from 'classnames';
import { compose } from 'redux';
import Card, { CardHeader, CardMedia, CardContent, CardActions } from 'material-ui/Card';
import Collapse from 'material-ui/transitions/Collapse';
import Avatar from 'material-ui/Avatar';
import IconButton from 'material-ui/IconButton';
import Typography from 'material-ui/Typography';
import red from 'material-ui/colors/red';
import FavoriteIcon from 'material-ui-icons/Favorite';
import ShareIcon from 'material-ui-icons/Share';
import ExpandMoreIcon from 'material-ui-icons/ExpandMore';
import MoreVertIcon from 'material-ui-icons/MoreVert';
import CheckCircle from '@material-ui/icons/CheckCircle';
import CheckBoxOutline from '@material-ui/icons/CheckBoxOutlineBlank';
import DoneAll from '@material-ui/icons/DoneAll';
import * as R from 'ramda';
import * as uid from 'uuid/v4';


import classImage from '../../assets/images/mindthief.jpg';
import { deleteCharacter } from '../../redux/actions';
import { connect } from 'react-redux';
import Menu, { MenuItem } from 'material-ui/Menu';
import EditCharacterModal from './Character/EditCharacter/EditCharacterModal';
import './NEW_CharCard.css';
import Flipper from './CardFlipper/CardFlipper';



const styles = theme => ({
  card: {
    maxWidth: 400,
  },
  media: {
    height: 194,
  },
  actions: {
    display: 'flex',
  },
  expand: {
    transform: 'rotate(0deg)',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
    marginLeft: 'auto',
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  avatar: {
    backgroundColor: red[500],
  },
});

class ComplexCard extends React.Component {
  state = { 
    flipped: false 
  }
 
  componentDidMount() {
    console.log(this.props.history);
  }
  

  flip = () => {
    this.setState({ flipped: !this.state.flipped})
    console.log("Flipped");
  }
  render() {
    return (
      
      <div>
            <Flipper character={this.props.character} charId={this.props.displayMe}/>
      </div>
    );
  }
}

ComplexCard.propTypes = {
  classes: PropTypes.object.isRequired,
};
const mapDispatchToProps = dispatch => {
  return {
    deleteCharacter: character => dispatch(deleteCharacter(character))
  };
};

export default compose(connect(null, mapDispatchToProps), withStyles(styles))(ComplexCard);