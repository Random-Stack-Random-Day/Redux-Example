import React from 'react';

const CardBack = (props) => {
    return (
        <div>
            <div className="back">{props.children}</div>
        </div>
    );
};

export default CardBack;