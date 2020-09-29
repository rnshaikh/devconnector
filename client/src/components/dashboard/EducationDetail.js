import React,{ Fragment} from 'react';
import Moment from 'react-moment';
import PropTypes from 'prop-types';

function EducationDetail({profile}) {
    return (
        <Fragment>
            <div className="profile-edu bg-white p-2">
            <h2 className="text-primary">Education</h2>
            {profile.profile.education.map(edu =>(
                <div key={edu._id}>
                <h3>{edu.school}</h3>
                <p><Moment format="YYYY/MM/DD">
                    {edu.from}
                </Moment> - {edu.current ? <p>current</p>: <Moment format="YYYY/MM/DD">
                    {edu.to}
                </Moment> }</p>
                <p><strong>Degree: </strong>{edu.degree}</p>
                <p><strong>Field Of Study: </strong>{edu.fieldofstudy}</p>
                <p>
                <strong>Description: </strong>{edu.description}
                </p>
                </div>    
            ))}
            </div>
        </Fragment>
    )
}

EducationDetail.propTypes = {
    profile: PropTypes.object.isRequired,
}

export default EducationDetail

