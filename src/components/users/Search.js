import React, { useContext, useState } from 'react';
import GithubContext from '../../context/github/githubContext';
import AlertContext from '../../context/alert/alertContext';

const Search = ({ setAlert }) => {
  const githubContext = useContext(GithubContext);
  const alertContext = useContext(AlertContext);
  
  const [text, setText] = useState('');


  const onSubmit = e => {
    e.preventDefault();
    if(text === '') {
      alertContext.setAlert('a.u.b voer iets in', 'light');
    } else  {

      githubContext.searchUsers(text);
      setText('');
    }
  };

  const onChange = e => setText(e.target.value);


    
    return (
      <div>
        <form onSubmit={onSubmit} className='form'>
          <input
            type='text'
            name='text'
            placeholder='Zoek Gebruikers...'
            value={text}
            onChange={onChange}
          />
          <input
            type='submit'
            name='Search'
            className='btn btn-dark btn-block'
          />
        </form>
        {githubContext.userslength > 0 && (

        <button className="btn btn-light btn-block" onClick={githubContext.clearUsers}>Wissen</button>
        )}
      </div>
    );
  
};


export default Search;
