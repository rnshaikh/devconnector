import React,{Fragment} from 'react';
import PropTypes from 'prop-types';

function BioDetail({profile}) {
    return (
        <Fragment>
        <div className="profile-about bg-light p-2">
          <h2 className="text-primary">{profile.profile.user.name}'s Bio</h2>
          <p>
            {profile.profile.bio}
          </p>
          <div className="line"></div>
          <h2 className="text-primary">Skill Set</h2>
          <div className="skills">
            { profile.profile.skills.map(skill=>(
                <div className="p-1" key={skill}><i className="fa fa-check"></i> {skill}</div>    
            ))}
          </div>
        </div>
        </Fragment>
    )
}

BioDetail.propTypes = {
    profile: PropTypes.object.isRequired,
}

export default BioDetail

