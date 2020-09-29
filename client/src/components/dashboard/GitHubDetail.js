import React,{useEffect, Fragment} from 'react';
import{ connect }  from "react-redux";
import PropTypes from 'prop-types';
import {getGithubRepo} from '../../actions/profile';

function GitHubDetail({profile,getGithubRepo}) {

    useEffect(() => {
        getGithubRepo(profile.profile.handle);
    }, [getGithubRepo]);

    console.log("Github............",profile)
    return (
        <Fragment>
            <div className="profile-github">
          <h2 className="text-primary my-1">
            <i className="fab fa-github"></i> Github Repos
          </h2>
          {profile.repos !== null && profile.repos ? profile.repos.map(repo=>(
            <div className="repo bg-white p-1 my-1" key={repo.html_url}>
            <div>
              <h4><a href={repo.html_url} target="_blank"
                  rel="noopener noreferrer">{repo.name}</a></h4>
              <p>
                {repo.description}
              </p>
            </div>
            <div>
              <ul>
                    <li className="badge badge-primary">Stars: {repo.stargazers_count}</li>
                    <li className="badge badge-dark">Watchers: {repo.watchers_count}</li>
                    <li className="badge badge-light">Forks: {repo.forks_count}</li>
              </ul>
            </div>
            </div>
          )): <strong>No Found</strong>}
        </div>
        </Fragment>
    )
}

GitHubDetail.propTypes = {
    profile: PropTypes.object.isRequired,
    getGithubRepo: PropTypes.func.isRequired,

}

const mapStateToProps=state=>({
    profile : state.profile
  })
  
export default connect(mapStateToProps, { getGithubRepo })(GitHubDetail);

