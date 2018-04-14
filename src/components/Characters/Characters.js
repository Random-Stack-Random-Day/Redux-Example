import React from 'react';
import { connect } from 'react-redux';
import Form from './CharacterForm';

const Characters = (props) => {
    return (
        <div>
            {Object.keys(props.characters)
                .map((k,index) => {
                    return <li key={index}>{k}</li>
                })
            }
            <Form />
        </div>
    );
};

const mapStateToProps = state => {
    return { characters: state.characters };
}

export default connect(mapStateToProps)(Characters);