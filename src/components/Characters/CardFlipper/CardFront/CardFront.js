import React from 'react';

const CardFront = (props) => {
    return (
        <div className="front">{props.children}</div>
    );
};

export default CardFront;