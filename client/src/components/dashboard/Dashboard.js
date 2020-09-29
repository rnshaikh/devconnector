import React,{useEffect, Fragment} from 'react'
import{ connect }  from "react-redux";
import { getCurrentUserProfile, deleteAccount} from '../../actions/profile';
import {loadUser} from '../../actions/auth';
import DashboardAction from './DashboardAction';
import ListExperience from './ListExperience';
import ListEducation from './ListEducation';
import Spinner from "../layout/Spinner";
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';


export const Dashboard = ({getCurrentUserProfile, deleteAccount, auth, profile}) => {
    console.log("Profile....")
    useEffect(() => {
        getCurrentUserProfile();
    }, [getCurrentUserProfile]);
    console.log("Auth,,,,,,,,,,,,,,,,,,,,,", auth.user)
    return profile.loading && profile.profile && auth.user!==null ? <Spinner></Spinner> : 
    <Fragment>
        <h1 className="large text-primary">Dashboard</h1>
<p className="lead"><i className="fa fa-user"></i>Welcome {auth.user ? auth.user.name : ""}</p>
    
    { profile.profile != null ?(
        <Fragment>
            <DashboardAction></DashboardAction>
            <ListExperience experience ={ profile.profile? profile.profile.experience : [] }></ListExperience>
            <ListEducation education ={ profile.profile? profile.profile.education : [] }></ListEducation>
            <div className="my-2">
                <button className="btn btn-danger" onClick={()=>{deleteAccount()}}>
                    <i className="fa fa-user"> </i>
                    Delete Account
                </button>
            </div>
        </Fragment>
    ):(
        <Fragment
            ><p>Have not setup profile . please setup profile</p>
            <Link to="/create-profile" className="btn btn-primary my-1">Create Profile</Link>
        </Fragment>
    )}
   
    </Fragment>
    // (
    //     <div>
    //         <h1>Dashboard</h1>
    //     </div>
    // )
}

Dashboard.prototype = {
    auth: PropTypes.object.isRequired,
    profile : PropTypes.object.isRequired,
    getCurrentUserProfile : PropTypes.func.isRequired,
    deleteAccount: PropTypes.func.isRequired,
  }

const mapStateToProps=state=>({
    auth : state.auth,
    profile : state.profile,
  })
  
export default connect(mapStateToProps, { getCurrentUserProfile, deleteAccount})(Dashboard);