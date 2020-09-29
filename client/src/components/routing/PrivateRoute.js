import React from 'react';
import { Route} from "react-router-dom";
import { Redirect} from 'react-router-dom';
import{ connect }  from "react-redux";
import PropTypes from 'prop-types';


export const PrivateRoute = ({component: Component, auth:{isAuthenticated, loading}, ...rest }) => (
    <Route {...rest} render={props => !isAuthenticated && !loading ? (<Redirect to="/login"></Redirect>):
    (<Component {...props}/>)}/>

)


PrivateRoute.prototype = {
    auth : PropTypes.object.isRequired,
}

const mapStateToProps = state =>({
    auth: state.auth
})

export default connect(mapStateToProps)(PrivateRoute);