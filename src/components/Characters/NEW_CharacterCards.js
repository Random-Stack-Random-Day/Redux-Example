import React from 'react';
import Flipper from './CardFlipper/CardFlipper';


class ComplexCard extends React.Component {
  state = { 
    flipped: false 
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

export default ComplexCard;