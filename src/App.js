import React, { Component } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { connect } from "react-redux";
import firebase from 'firebase';
import Loading from './components/UI/Loading/Loading';
import AuthRoute from './HOC/AuthRoute';
import Login from './components/Login/Login';
import Homepage from './components/Homepage/Homepage';
import { getCharacters } from './redux/actions/index';
const mapDispatchToProps = dispatch => {
  return {
    getCharacters: characters => dispatch(getCharacters())
  };
};

class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      loading: true,
      user: null,
      characters: {}
    };
  }

  
  async componentDidMount() {
    this.props.getCharacters();
    // await firebase.auth().onAuthStateChanged(user => {
    //   if (user) {
    //     console.log("Logged in", user)
    //     this.setState({ user, loading: false });
    //     this.props.getCharacters();
    //   }
    //   else {
    //     console.log("Not logged in")
    //     this.setState({ loading: false })
    //     this.props.getCharacters();
    //   }
    // });
  }

  render() {
    if (this.state.loading) {
      return <Loading/>;
    }

    return (
      // <BrowserRouter>
      //   <Switch>
      //     <Route exact path="/login" component={Login} />
      //     <AuthRoute path="/" component={Homepage} />
      //   </Switch>
      // </BrowserRouter>
      <Homepage />
    );
  }
}

export default connect(null, mapDispatchToProps)(App);
