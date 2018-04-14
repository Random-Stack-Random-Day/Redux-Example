import React from 'react';
import AppBar from '../UI/AppBar/AppBar';
import { connect } from 'react-redux';
import Characters from '../Characters/Characters';

const Layout = (props) => {
    return (
        <div>
            <AppBar {...props} />
            <Characters />
        </div>
    );
};
const mapStateToProps = state => {
    return { user: state.user, characters: state.characters };
}
export default connect(mapStateToProps)(Layout);