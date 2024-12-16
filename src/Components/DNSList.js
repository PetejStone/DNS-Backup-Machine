import React from 'react';

import DNSItem from './DNSItem';
import  loading from '../Images/loader-icon.png'
const DNSList = ({dns,noDomains,domainCount,currentCount,fetchServer}) => { 

    // console.log('calling from DNSLISt', dns)


    let data =  dns.map(obj => {
          
      const [key, value] = Object.entries(obj)[0];
      return <DNSItem currentCount={currentCount} domain={key} values={value} noDoamins={noDomains} />
      

    
    })
  

    
  return(
    <>
    {dns.length > 0   ? 
     <div>  
        <h3>{dns.length}/{domainCount} subdomains had DNS Records</h3>
        <div>{data}</div>
      </div>
   
      
     
     
     
     : <div class="loading-content">
          <h2>Searching For DNS Records, this may take several seconds...</h2>
          <h2>Found {domainCount} Subdomains</h2>
          <h3>Gathering Records<br></br>
              {currentCount} / {domainCount}
          </h3>
          
          <img src={loading} alt="loading"  class="loading-icon" />
        </div>}
    </>
  );
}

export default DNSList;
