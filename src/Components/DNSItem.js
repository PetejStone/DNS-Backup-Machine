import React from 'react';


const DNSItem = ({domain,values,noDomains,currentCount}) => { 
    const entriesArray = Object.entries(values);
    console.log('calling from DNSItem', domain, values)

    return (
<>
  {!noDomains ? (
    <div className="dns-container">
      <h2 className="domain-name">{domain}</h2>
      <table style={{ width: '100%', maxWidth: '100%', tableLayout: 'fixed', borderCollapse: 'collapse' }}>
        <colgroup>
          <col style={{ width: '30%' }} />
          <col style={{ width: '70%' }} />
        </colgroup>
        <tbody>
          {entriesArray.map(([key, value], index) => (
            value.length > 0 && (
              <tr key={key} style={{ borderBottom: '1px solid #ddd' }}>
                <td style={{ padding: '8px', textAlign: 'left' }}>
                  <strong className="record-type">{key}:</strong>
                </td>
                <td style={{ padding: '8px', textAlign: 'left' }}>
                  {Array.isArray(value) ? (
                    <table style={{ width: '100%', tableLayout: 'fixed', borderCollapse: 'collapse' }}>
                      <tbody>
                        {value.map((item, index) => (
                          <tr key={index} className="domain-item">
                            <td style={{ padding: '8px', textAlign: 'left' }}>
                              {typeof item === 'object' ? (
                                Object.entries(item).map(([prop, val], index) => (
                                  <div key={prop}>
                                    <strong className="record-name">{prop}:</strong> {val}
                                  </div>
                                ))
                              ) : (
                                item
                              )}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  ) : (
                    <div style={{ padding: '8px', textAlign: 'left' }}>{JSON.stringify(value)}</div>
                  )}
                </td>
              </tr>
            )
          ))}
        </tbody>
      </table>
    </div>
  ) : (
    <h3>Sorry, the domain you entered does not exist</h3>
  )}
</>






      );
    };
    


export default DNSItem;
