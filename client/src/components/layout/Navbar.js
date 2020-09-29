import React from 'react'
import { Link } from 'react-router-dom';
import { Fragment} from 'react';
import{ connect }  from "react-redux";
import { logout} from '../../actions/auth';
import PropTypes from 'prop-types'


export const Navbar = ({auth:{ isAuthenticated, loading }, logout}) => {

    const authLinks = (
        <ul>

            <li><Link to="/developers">
            <i className="fa fa-user"></i>{' '}<span className="hide-sm"></span>Developers</Link></li>

            <li><Link to="/posts">
            <i className="fa fa-user"></i>{' '}<span className="hide-sm"></span>Posts</Link></li>

            <li><Link to="/dashboard">
            <i className="fa fa-user"></i>{' '}<span className="hide-sm"></span>Dashboard</Link></li>
            <li><Link to="/" onClick={ logout }>
            <i className="fa fa-sign-out"></i>{' '}<span className="hide-sm"></span> 
            Logout</Link>
            </li>
        </ul>

    )

    const guestLinks = (
        <ul>
                <li><Link to="/developers">Developers</Link></li>
                <li><Link to="/register">Register</Link></li>
                <li><Link to="/login">Login</Link></li>
        </ul>
    )

    return (
    
        <nav className="navbar bg-dark">
            <h1>
                <Link to="/"><i className="fas fa-code"></i> DevConnector</Link>
            </h1>
            {!loading && (<Fragment>{ isAuthenticated? authLinks: guestLinks}</Fragment>)}
        </nav>
        
    )
}

Navbar.prototype = {
    logout:PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    
  }

const mapStateToProps=state=>({
    auth : state.auth
  })

export default connect(mapStateToProps, { logout })(Navbar);