// // server/server.js

// const axios = require('axios');
// console.log("SERVER IS HERE")
exports.handler = async (event, context) => {
    console.log('Server has been called!')
  try {
    const query = event.queryStringParameters.query;
    const apiKey = event.queryStringParameters.apiKey;
    const response = await axios.get(`https://api.securitytrails.com/v1/domain/${query}/subdomains?children_only=true`, {
      headers: {
        'APIKEY': apiKey
      }
    });
    return {
      statusCode: 200,
      body: JSON.stringify(response.data)
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message })
    };
  }
};
// console.log('hello')
// exports.handler = async function (event, context) {
//   return {
//     statusCode: 200,
//     body: JSON.stringify({ message: “Hello World” }),
//   };
// };