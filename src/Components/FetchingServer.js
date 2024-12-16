import React from 'react';

import DNSItem from './DNSItem';
import  loading from '../Images/loader-icon.png'
const FetchingServer = ({dns,noDomains,domainCount,currentCount,fetchServer}) => { 

  return(
    <>
  {fetchServer   && 
   
   <div class="loading-content">
         {console.log('fetch server is, ', fetchServer)}
          <h2>Getting Data From Server, This May Take a Few Minutes...Please Be Patient.</h2>
         
          <img src={loading} alt="loading"  class="loading-icon" />
        </div>}
    </>
  );
}

export default FetchingServer;
