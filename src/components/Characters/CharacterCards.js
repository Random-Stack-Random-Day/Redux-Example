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
import cssClasses from './CharCard.css';



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
    expanded: false,
    anchorEl: null
  };

  componentDidMount() {
    console.log(this.props.character, 'Cards')
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
      
      <div>
        <Card className={cssClasses.card} onDoubleClick={() => this.props.onDoubleClick(this.props.character)}>
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
              <Typography paragraph variant="body2">
                Method:
              </Typography>
              <Typography paragraph>
                Heat 1/2 cup of the broth in a pot until simmering, add saffron and set aside for 10
                minutes.
              </Typography>
              <Typography paragraph>
                Heat oil in a (14- to 16-inch) paella pan or a large, deep skillet over medium-high
                heat. Add chicken, shrimp and chorizo, and cook, stirring occasionally until lightly
                browned, 6 to 8 minutes. Transfer shrimp to a large plate and set aside, leaving
                chicken and chorizo in the pan. Add pimentón, bay leaves, garlic, tomatoes, onion,
                salt and pepper, and cook, stirring often until thickened and fragrant, about 10
                minutes. Add saffron broth and remaining 4 1/2 cups chicken broth; bring to a boil.
              </Typography>
              <Typography paragraph>
                Add rice and stir very gently to distribute. Top with artichokes and peppers, and
                cook without stirring, until most of the liquid is absorbed, 15 to 18 minutes.
                Reduce heat to medium-low, add reserved shrimp and mussels, tucking them down into
                the rice, and cook again without stirring, until mussels have opened and rice is
                just tender, 5 to 7 minutes more. (Discard any mussels that don’t open.)
              </Typography>
              <Typography>
                Set aside off of the heat to let rest for 10 minutes, and then serve.
              </Typography>
            </CardContent>
          </Collapse>
        </Card>
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