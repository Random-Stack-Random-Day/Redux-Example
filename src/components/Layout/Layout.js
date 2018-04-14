import React from 'react';
import AppBar from '../UI/AppBar/AppBar';
import { connect } from 'react-redux';
import Characters from '../Characters/Characters';

const divStyle = {
    maxWidth: '100%'
};

const Layout = (props) => {
    return (
        <div stlye={divStyle}>
            <AppBar {...props} />
            <Characters />
        </div>
    );
};
const mapStateToProps = state => {
    return { user: state.user, characters: state.characters };
}
export default connect(mapStateToProps)(Layout);