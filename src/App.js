import React, {useState, useEffect} from "react";
import SearchForm from './Components/SearchForm';
import DNSList from "./Components/DNSList";
import axios from 'axios'


function App() {

  const [query,setQuery] = useState('');
  const [apiKey,setApiKey] = useState('');
  const[fetching,setFetching] = useState(true);
  const [domains, setDomains] = useState([]);

  const [dns, setDns] = useState([]);
  const [initialFetchCompleted, setInitialFetchCompleted] = useState(false);
  const [building,setBuilding] = useState(false);
  const [noDomains,setNoDomains] = useState(false);
  const [domainCount, setDomainCount] = useState(0);
  const [currentCount, setCurrentCount] = useState(0)
  
  useEffect(() => {

    let activeFetch = true;
   
    
    query !== '' && axios.get(`https://corsproxy.io/?https://api.securitytrails.com/v1/domain/${query}/subdomains?children_only=true`,
      {
        headers: {
          'Content-Type': 'application/json',
          'APIKEY': `${apiKey}`
         
          // Add any other headers as needed
        }
      }
      )
      .then(
        response =>
        {
          if(activeFetch) {

            console.log('data',response)
         
            let temp = [query, `_dmarc.${query}`, `ctct1._domainkey.${query}`, `ctct2._domainkey.${query}`, `google_domainkey.${query}`]
            if (response.data.subdomain_count !== 0 ) {
              setNoDomains(false)
              response.data.subdomains.map(subdomain => temp.push(`${subdomain}.${query}`) )
              setDomainCount(response.data.subdomain_count + 5)
            } else {
              setNoDomains(true)
            }
        
            setDomains(temp)
            setInitialFetchCompleted(true);             
          }

        }
      )
      .catch(
        error => {
          console.log('Error fetching and getting data', error)
          alert('Sorry, no subdomains were found, or the domain you entered does not exist. Please ensure your entry does not include any invalid characters. Please also ensure it has a proper extension (.com, .net, etc.)')
      
      }
      );


      return () => {
        console.log('done with query')
        activeFetch = false
        setFetching(false)
      }


  }, [query, apiKey])


  
  const handleQueryChange = (text,apiKey) => {
    console.log('text is,', text, 'api key', apiKey)
    setQuery(text)
    setFetching(true)
    setApiKey(apiKey)

  }

  
  const getDNS = async (subdomains) => {
    console.log('getDNS of', subdomains);
    let temp = [];
    setBuilding(true)
    for (const subdomain of subdomains) {
      try {
        const response = await axios.get(`https://corsproxy.io/?https://networkcalc.com/api/dns/lookup/${subdomain}`, {
          headers: {
            'Content-Type': 'application/json'
          }
        });
        setCurrentCount(prevCount => prevCount + 1)
        if (response.data.status !== "NO_RECORDS") {
          let object = {
            [response.data.hostname]: response.data.records
          };
          temp.push(object);
          console.log(temp);
        }
      } catch (error) {
        console.log('Error fetching and getting data', error);
      }
  
      // Add a delay of 5 seconds before making the next API call
      await new Promise(resolve => setTimeout(resolve, 500));
    }
  
    console.log('DNS RECORDS ARE ALL HERE', temp);
  
    // Now that all asynchronous operations are done, update the state
    setDns(temp);

  };


  useEffect(() => {
    // This useEffect will run after the initial fetch is completed
    if (initialFetchCompleted) {

      //Initial stage 
      getDNS(domains);
    }
  }, [initialFetchCompleted, domains]);


  return (

    <div>
    

      <div className="main-header">
        <div className="inner">
          <h1 className="main-title">DNS Records Backup Machine</h1>
          <div class="form-side">
              <SearchForm queryChange={handleQueryChange}/>
              {/* <KeyEntry queryChange={handleQueryChange}/>           */}
            </div>
        </div>
      </div>
      <div className="main-content">
      {
        // building
        //   ? noDomains
        //     ? <h3>Sorry, no subdomains were found, or the domain you entered does not exist.</h3>
        //     : <DNSList dns={dns} noDomains={noDomains} />
        //   : <h2>Enter Domain Name Above</h2>
        building  ? <DNSList currentCount={currentCount} domainCount={domainCount} dns={dns} noDomains={noDomains}/> :  <h2>Enter Domain Above</h2>  
      }

      </div>
    </div>
  );
}

export default App;
