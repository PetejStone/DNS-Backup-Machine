import React, { useState,useRef } from 'react';

const SearchForm = ({queryChange}) => {
  const searchText = useRef({current: null});
  const apiKey = useRef({current: null});  

  const handleSubmit = e => {
    e.preventDefault();
    queryChange(searchText.current.value,apiKey.current.value)
    e.currentTarget.reset()


  }

  return (
    <form className="search-form" onSubmit={e => handleSubmit(e)} >
      <label className="is-hidden" htmlFor="search">Search</label>
      <input type="search" 
             ref={searchText}
             name="search" 
             required
             placeholder="Enter Domain Here (no www or https)" />
      <input type="search" 
             ref={apiKey}
             name="apiKey" 
             placeholder="Enter Your API Key Here" 
             required
             />      
             <p className="req-api">This App requires a Security Trails API Key</p>
             <a className="api-link" href="https://securitytrails.com/app/signup?plan=api-0" target="_blank">Get One Free Here</a>       
      <button type="submit" id="submit" className="search-button" ><i className="material-icons icn-search">search</i></button>
    </form>      
  );
}

export default SearchForm;