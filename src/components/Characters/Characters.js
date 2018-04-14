import React from 'react';
import { connect } from 'react-redux';
import Form from './CharacterForm';
import ComplexCards from '../UI/Cards/ComplexCards';

const Characters = (props) => {
    return (
        <div>
            {Object.keys(props.characters)
                .map((k,index) => {
                    // return <li key={index}>{props.characters[k].name}</li>
                    return <ComplexCards name = {props.characters[k].name}
                    charClass={props.characters[k].class}
                    level={props.characters[k].level} 
                    key={index}
                    />
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