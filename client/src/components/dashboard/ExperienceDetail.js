import React from 'react';
import Moment from 'react-moment';
import PropTypes from 'prop-types';

function ExperienceDetail({profile}) {
    return (
        
        <div className="profile-exp bg-white p-2">
          <h2 className="text-primary">Experience</h2>
            {profile.profile.experience.map(exp =>(
                <div key={exp._id}>
                <h3 className="text-dark">{exp.company}</h3>
                <p><Moment format="YYYY/MM/DD">
                    {exp.from}
                </Moment> - {exp.current ? <p>current</p>: <Moment format="YYYY/MM/DD">
                    {exp.to}
                </Moment> }</p>
                <p><strong>Position: </strong>{exp.title}</p>
                <p>
                  <strong>Description: </strong>{exp.description}
                </p>
              </div>    
            ))}
        </div>
        
    )
}

ExperienceDetail.propTypes = {
    profile : PropTypes.object.isRequired,
}

export default ExperienceDetail

