import React, { Component, Fragment } from 'react';
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


import classImage from '../../../assets/images/mindthief.jpg';
import { deleteCharacter } from '../../../redux/actions';
import { connect } from 'react-redux';
import Menu, { MenuItem } from 'material-ui/Menu';
import EditCharacterModal from '../Character/EditCharacter/EditCharacterModal';
import FlipCard from '@kennethormandy/react-flipcard'

// Import minimal required styles however you’d like
import '@kennethormandy/react-flipcard/dist/Flipcard.css'
import EditCharForm from '../Character/EditCharacter/EditCharacterForm';
// import './NEW_CharCard.css';

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

class CardFlipper extends Component {
    state = { 
        expanded: false,
        anchorEl: null,
        isFlipped: false
      };
    
      componentDidMount() {
        console.log(this.props.character, 'Cards')
        // console.log(cssClasses);
      }
    
      handleMenu = (event) => {
        this.setState({ anchorEl: event.currentTarget });
      };
    
      handleClose = () => {
        this.setState({ anchorEl: null });
      };
    
    
      removeCharacter = (character) => {
        this.props.deleteCharacter(character);
      }
    
      handleExpandClick = () => {
        this.setState({ expanded: !this.state.expanded });
      };
    
      onDeleteHandler = (deleteId) => {
        this.setState({ anchorEl: null });
        this.removeCharacter(deleteId); 
      };
    
      onEditHandler = () => {
        console.log("Closed");
        this.setState({ anchorEl: null });
        // console.log(character)
      }
    
      render() {
        const { anchorEl } = this.state;
        const { classes } = this.props;
        const open = Boolean(anchorEl);
        const separateEvery = (sep, n, xs) => R.unnest(R.intersperse([sep], R.splitEvery(n, xs)))
    
        const genElements = (totalSize, progress) => separateEvery(<DoneAll />, 3, 
                            R.concat(
                              R.range(0, progress).map(() => <CheckCircle key={uid()} /> ), 
                              R.range(progress, 18).map(() => <CheckBoxOutline key={uid()} />)
                            )
                  )       
        return (
          <Fragment>
            <FlipCard flipped={this.state.flipped} onDoubleClick={e => this.setState({ flipped: !this.state.flipped })}>
            <Card>
                  <CardHeader
                      avatar={
                      <Avatar aria-label="Recipe" className={classes.avatar}>
                          {this.props.character.name.charAt(0).toUpperCase()}
                      </Avatar>
                      }
                      action={
                      <IconButton
                          aria-owns={anchorEl ? 'character-menu' : null}
                          aria-haspopup="true"
                          onClick={this.handleMenu}
                      >
                          <MoreVertIcon />
                      </IconButton>
                      }
                      
                      title={this.props.character.name + ' the ' + this.props.character.charClass}
                      subheader={this.props.character.level}
                  />
                  <Menu
                      id="character-menu"
                      anchorEl={anchorEl}
                      open={open}
                      onClose={this.handleClose}
                  >
                      <MenuItem>Log Game </MenuItem>
                      <EditCharacterModal character={this.props.character} closeMenuHandler={this.onEditHandler}/>
                      <MenuItem onClick={() => this.onDeleteHandler(this.props.displayMe)}>Delete This Character</MenuItem>
                  </Menu> 
                  <CardMedia
                      className={classes.media}
                      image={classImage}
                      title={this.props.class}
                  />
                  <CardContent>
                      <Typography component="p">
                      {genElements(18, this.props.character.checkmarks)}
                      <DoneAll/>
                      </Typography>
                  </CardContent>
                  <CardActions className={classes.actions} disableActionSpacing>
                      <IconButton aria-label="Add to favorites">
                      <FavoriteIcon />
                      </IconButton>
                      <IconButton aria-label="Share">
                      <ShareIcon />
                      </IconButton>
                      <IconButton
                      className={classnames(classes.expand, {
                          [classes.expandOpen]: this.state.expanded,
                      })}
                      onClick={this.handleExpandClick}
                      aria-expanded={this.state.expanded}
                      aria-label="Show more"
                      >
                      <ExpandMoreIcon />
                      </IconButton>
                  </CardActions>
                  <Collapse in={this.state.expanded} timeout="auto" unmountOnExit>
                      <CardContent>
                          Some stuff
                      </CardContent>
                  </Collapse>
                  </Card>
            <EditCharForm character={this.props.character} />
            </FlipCard>
            
            </Fragment>
    );
    }
}

CardFlipper.propTypes = {
  classes: PropTypes.object.isRequired,
};
const mapDispatchToProps = dispatch => {
  return {
    deleteCharacter: character => dispatch(deleteCharacter(character))
  };
};

export default compose(connect(null, mapDispatchToProps), withStyles(styles))(CardFlipper);