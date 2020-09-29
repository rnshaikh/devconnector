import React, {Fragment} from 'react'
import PropTypes from 'prop-types'
import Moment from 'react-moment';
import { connect } from "react-redux";
import { deleteExperience } from '../../actions/profile';


function ListExperience({experience, deleteExperience}) {

    console.log("Exp", experience)
    // const experiences = <td></td>
    const experiences = experience.map(ex =>
        (
            <tr key={ex._id}>
                <td>{ex.title}</td>
                <td>{ex.company}</td>
                <td>
                <Moment format="YYYY/MM/DD">
                    {ex.from}
                </Moment> - {' '}{
                        ex.to === null ? ('Now'): (<Moment format="YYYY/MM/DD">
                        {ex.to}
                    </Moment> )
                    }
                </td>
                <td><button onClick={()=>{deleteExperience(ex._id)}}  className="btn btn-danger">Delete</button></td>
            </tr>
        )
        )

    return (
        <Fragment>
            <h2 className="my-2">Experience Credentials</h2>
            <table className="table">
                <thead>
                    <tr>
                        <th>Title</th>
                        <th className="hide-sm">Company</th>
                        <th className="hide-sm">Years</th>
                        <th> </th>
                    </tr>
                </thead>
                <tbody>
                    {experiences}
                </tbody>
            </table>

        </Fragment>
    )
}

ListExperience.propTypes = {
    experience: PropTypes.array.isRequired,
    deleteExperience: PropTypes.func.isRequired,
}

export default connect(null, { deleteExperience})(ListExperience);
