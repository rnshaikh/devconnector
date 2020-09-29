import React, { Fragment, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import './App.css';

import Navbar from './components/layout/Navbar';
import Landing from './components/layout/Landing';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import Alert from './components/layout/Alert';
import Profiles from './components/dashboard/Profiles';
import Posts from './components/post/Posts';
import Comments from './components/comment/Comments';
import ProfileDetail from './components/dashboard/ProfileDetail';
import Dashboard from './components/dashboard/Dashboard';
import PrivateRoute from './components/routing/PrivateRoute';
import CreateProfile from './components/profile-forms/CreateProfile';
import UpdateProfile from './components/profile-forms/UpdateProfile';
import Education from './components/profile-forms/Education';
import Experience from './components/profile-forms/Experience';
import { Provider} from 'react-redux';
import store  from './store';
import {loadUser} from './actions/auth';
import setAuthToken from './utils/authToken';


if(localStorage.token){
  setAuthToken(localStorage.token);
}

const App = ()=> {
  useEffect(()=>{
    store.dispatch(loadUser())
  }, [])
  return (
    <Provider store={store}>
    <Router>
      <Fragment>
        <Navbar></Navbar>
        <Route exact path="/" component={Landing}></Route>
        <section className="container">
          <Alert/>
          <Switch>
              <Route exact path="/login" component={Login}></Route>
              <Route exact path="/register" component={Register}></Route>
              <PrivateRoute exact path="/dashboard" component={Dashboard}></PrivateRoute>
              <PrivateRoute exact path="/create-profile" component={CreateProfile}></PrivateRoute>
              <PrivateRoute exact path="/update-profile" component={UpdateProfile}></PrivateRoute>
              <PrivateRoute exact path="/add-education" component={Education}></PrivateRoute>
              <PrivateRoute exact path="/add-experience" component={Experience}></PrivateRoute>
              <PrivateRoute exact path="/developers" component={Profiles}></PrivateRoute>
              <PrivateRoute exact path="/profile/:id" component={ProfileDetail}></PrivateRoute>
              <PrivateRoute exact path="/posts" component={Posts}></PrivateRoute>
              <PrivateRoute exact path="/posts/:id" component={Comments}></PrivateRoute>
              {/* <PrivateRoute exact path="/posts/:id" component={Comments}></PrivateRoute>  */}
          </Switch>

        </section>
      </Fragment>
    </Router>
    </Provider>
  );
}

export default App;
