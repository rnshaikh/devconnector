import React from 'react'
import {Link, Redirect} from 'react-router-dom';
import { useState } from 'react';
import{ connect }  from "react-redux";
import { login } from '../../actions/auth';
import PropTypes from 'prop-types';


export const Login = ({ login, isAuthenticated }) => {

    const [formData, setFormData] = useState({
        email:'',
        password:''
    });

    const {email, password} = formData;

    const onChange = (e)=>{
        setFormData({...formData,[e.target.name]:e.target.value})
    } 

    const onSubmit = (e)=>{
        e.preventDefault();
        ;
        login(email,password);   
    }

    if(isAuthenticated){
      return <Redirect to="/dashboard"></Redirect>
    }
    return (
    <section className="container">
      <h1 className="large text-primary">Log in</h1>
      <p className="lead"><i className="fas fa-user"></i> Log Into Your Account</p>
      <form className="form" onSubmit={e=>onSubmit(e)}>
        <div className="form-group">
          <input type="email" placeholder="Email Address" name="email" 
          value={email}
          onChange={e=> onChange(e)}
          />
        </div>
        <div className="form-group">
          <input
            type="password"
            placeholder="Password"
            name="password"
            minLength="6"
            value={password}
            onChange={e=> onChange(e)}
          />
        </div>
        <input type="submit" className="btn btn-primary" value="Register" />
      </form>
      <p className="my-1">
        Dont have an account? <Link to="/register">Sign Up</Link>
      </p>
    </section>
    )
}

Login.prototype = {
  login:PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
  
}

const mapStateToProps=state=>({
  isAuthenticated: state.auth.isAuthenticated
})

export default connect(mapStateToProps, { login })(Login);