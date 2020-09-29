import React,{useEffect, Fragment} from 'react';
import{ connect }  from "react-redux";
import { getProfileByUserId } from '../../actions/profile';
import Spinner from "../layout/Spinner";
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import BioDetail from './BioDetail';
import EducationDetail from './EducationDetail';
import ExperienceDetail from './ExperienceDetail';
import GitHubDetail from './GitHubDetail';

function ProfileDetail({match, profile, getProfileByUserId}) {
    
    useEffect(() => {
        ;
        getProfileByUserId(match.params.id);
    }, [getProfileByUserId]);

    console.log("Profile", profile)
    return profile.loading ? <Spinner></Spinner>:
        (
        <Fragment>
            <Link to="/developers" className="btn btn-light">Back To Profiles</Link>
            <div className="profile-grid my-1">
                <div className="profile-top bg-primary p-2">
                    <img
                        className="round-img my-1"
                        src={profile.profile.user.avatar}
                        alt=""
                    />
                    <h1 className="large">{profile.profile.user.name}</h1>
                    <p className="lead">{profile.profile.status} at {profile.profile.company}</p>
                    <p>{profile.location}</p>
                    {profile.social ? <div className="icons my-1">
                        { profile.profile.social.youtube ?
                            <a href={profile.profile.social.youtube} target="_blank" rel="noopener noreferrer">
                                <i className="fa fa-youtube fa-2x"></i>
                            </a>
                        : ""
                        }
                        {profile.profile.social.twitter?
                            <a href={profile.profile.social.twitter} target="_blank" rel="noopener noreferrer">
                                <i className="fa fa-twitter fa-2x"></i>
                            </a>
                        :""
                        }
                        {profile.profile.social.facebook ?
                            <a href={profile.profile.social.facebook} target="_blank" rel="noopener noreferrer">
                                <i className="fa fa-facebook fa-2x"></i>
                            </a>
                            :""
                        }
                        {profile.profile.social.linkedin?
                            <a href={profile.profile.social.linkedin} target="_blank" rel="noopener noreferrer">
                                <i className="fa fa-linkedin fa-2x"></i>
                            </a>
                        :""
                        }
                        {profile.profile.social.instagram ? 
                            <a href={profile.profile.social.instagram} target="_blank" rel="noopener noreferrer">
                                <i class="fa fa-instagram fa-2x"></i>
                            </a>:""
                    
                        }
                    </div>: ""}
                </div>
                <BioDetail profile={profile}/>
                <ExperienceDetail profile={profile}></ExperienceDetail>
                <EducationDetail profile={profile}></EducationDetail>
                <GitHubDetail profile={profile}></GitHubDetail>

            </div>
        </Fragment>
        )
}

ProfileDetail.propTypes = {
    auth: PropTypes.object.isRequired,
    profile : PropTypes.object.isRequired,
    getProfileByUserId : PropTypes.func.isRequired,

}
const mapStateToProps=state=>({
    auth : state.auth,
    profile : state.profile,
  })
  
export default connect(mapStateToProps, { getProfileByUserId })(ProfileDetail);

