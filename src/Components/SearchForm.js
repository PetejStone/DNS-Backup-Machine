import React, { useState, useRef } from 'react';

const SearchForm = ({ queryChange, building, setQueryStarted, queryStarted }) => {
  const searchText = useRef(null);
  const apiKey = useRef(null);  

  const handleSubmit = e => {
    e.preventDefault();
   
    // Only access ref values if the refs are not null
    const searchValue = searchText.current ? searchText.current.value : '';
    const apiKeyValue = apiKey.current ? apiKey.current.value : '';

    // Call queryChange only if both searchValue and apiKeyValue are not empty
    if (searchValue && apiKeyValue) {
      queryChange(searchValue, apiKeyValue);
      setQueryStarted(true);
      e.currentTarget.reset(); // Reset the form after submission
    } else {
      console.warn('Both search and API key fields are required');
    }
  }

  return (
    <form className="search-form" onSubmit={handleSubmit}>
      <label className="is-hidden" htmlFor="search">Search</label>
      { !queryStarted && 
        <>
          <input 
            type="search"
            ref={searchText} // Attach ref to search text input
            name="search"
            required
            placeholder="Enter Domain Here (no www or https)" 
          />
          <input 
            type="search"
            ref={apiKey} // Attach ref to API key input
            name="apiKey"
            required
            placeholder="Enter Your API Key Here" 
          />
        </>
      }
      <p className="req-api">This App requires a Security Trails API Key</p>
      <a className="api-link" href="https://securitytrails.com/app/signup?plan=api-0" target="_blank">Get One Free Here</a>       
      { !queryStarted ? 
        <button type="submit" id="submit" className="search-button">
          <i className="material-icons icn-search">search</i>
        </button> :
        <button onClick={() => window.location.reload()} id="submit" className="search-button">
          <i className="material-icons icn-search">Run Another Query</i>
        </button>
      }
    </form>      
  );
}

export default SearchForm;
