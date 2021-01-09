import React, { Fragment, useEffect, useContext  } from 'react';
import Spinner from '../layout/Spinner';
import Repos from '../repos/Repos';
import { Link } from 'react-router-dom';
import GithubContext from '../../context/github/githubContext';


const User = ({ match }) => {
  const githubContext = useContext(GithubContext);
  const { getUser, loading, user, repos, getUserRepos } = githubContext;

  useEffect(() => {
    getUser(match.params.login);
    getUserRepos(match.params.login);
  // eslint-disable-next-line
  }, []);
  
    const {
      name,
      company,
      avatar_url,
      bio,
      blog,
      login,
      html_url,
      followers,
      following,
      public_repos,
      public_gists,
      hireable
    } = user;
    if (loading) return <Spinner />;
    return ( <Fragment>
      <Link to='/' className='btn btn-light'>Ga opnieuw zoeken </Link>
      Huurbaar: {' '}
      {hireable ? (<i className="fas fa-check text-succes"  /> ) : (<i className="fas fa-times-circle text-danger"  />)}
      <div className="card grid-2">
        <div className="all-center">
          <img src={avatar_url} className='round-img' alt="" style={{ width: '150' }} />
          <h1>{name}</h1>
        </div>
        <div>
          {bio && (
            <Fragment>
              <h3>Bio</h3>
              <p>{bio}</p>
            </Fragment>
          )}
          <a href={html_url} className='btn btn-dark my-1'>
            Bezoek Github Profile
          </a>
          <ul>
            <li>
              {login && <Fragment>
                <strong>
                  Gebruikersnaam: </strong> {login}
                  </Fragment>}
            </li>
            <li>
              {blog && <Fragment>
                <strong>
                  Website: </strong> {blog}
                  </Fragment>}
            </li>
            <li>
              {company && <Fragment>
                <strong>
                  Bedrijf: </strong> {company}
                  </Fragment>}
            </li>
          </ul>
        </div>
      </div>
      <div className="card text-center">
        <div className="badge badge-primary">Volgers: {followers}</div>
        <div className="badge badge-succes">Volgen: {following}</div>
        <div className="badge badge-danger">Openbaar archief: {public_repos}</div>
        <div className="badge badge-dark">Openbaar ess.: {public_gists}</div>
      </div>
      <Repos repos={repos} />
    </Fragment>
    );
  
};


export default User;
