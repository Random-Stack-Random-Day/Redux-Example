import React from 'react';

const Loading = props => {
    if (props.overlay) {
        return (
            <div className="overlay overlay-show">
                <div className="spinner"/>
            </div>
        );
    }

    return <div className="spinner"/>;
}

export default Loading;