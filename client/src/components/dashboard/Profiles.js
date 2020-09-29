import React,{useEffect, Fragment} from 'react';
import{ connect }  from "react-redux";
import { getAllProfile } from '../../actions/profile';
import Spinner from "../layout/Spinner";
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

function Profiles({getAllProfile, auth, profile}) {

    useEffect(() => {
        getAllProfile();
    }, [getAllProfile]);

    console.log("Profiles", profile)
    const profiles = profile.profiles.map(prof =>
        (
            <div className="profile bg-light" key={prof._id}>
            <img
                className="round-img"
                src={prof.user.avatar}
                alt=""
            />
            <div>
                <h2>{prof.user.name}</h2>
                <p>{prof.status} at {prof.company}</p>
                <p>{prof.location}</p>
                <Link className="btn btn-primary" to={`/profile/${prof.user._id}`}>View Profile</Link>
            </div>

            <ul>
            { prof.skills.slice(0,4).map(skill=>(
                <li className="text-primary" key={skill}>
                <i className="fa fa-check"></i> {skill}
                </li>    
            ))}
            </ul>
            </div>
        )
        )
    return profile.loading ? <Spinner></Spinner>:
        <Fragment>
            <section className="container">
            <h1 className="large text-primary">Developers</h1>
            <p className="lead">
                <i className="fab fa-connectdevelop"></i> Browse and connect with developers
            </p>
        <div className="profiles">
            {profile.profiles.length>0?(
                profiles
            ):
            <h4>No Profile Found..........</h4>
            }   
        </div>
        </section>

    </Fragment>
}

Profiles.propTypes = {
    auth: PropTypes.object.isRequired,
    profile : PropTypes.object.isRequired,
}
const mapStateToProps=state=>({
    auth : state.auth,
    profile : state.profile,
  })
  
export default connect(mapStateToProps, { getAllProfile })(Profiles);


