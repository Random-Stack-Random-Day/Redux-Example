import React, { Component } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

class AuthRoute extends Component {
    
    
    render() {
        const { component: Component, ...rest } = this.props;

        return this.props.user.authenticated ?
            <Route {...rest} render={(props) => (<Component {...props}/>)}/> :
            <Redirect to="/login"/>;
    }
}

const mapStateToProps = state => {
    return { user: state.user };
}

export default connect(mapStateToProps)(AuthRoute);