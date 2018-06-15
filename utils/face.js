const axios = require('axios');
const request = require('request');

const azureDetectEndpoint = 'https://westcentralus.api.cognitive.microsoft.com/face/v1.0/detect?returnFaceId=true&returnFaceLandmarks=false';
const azureVerifyEndpoint = 'https://westcentralus.api.cognitive.microsoft.com/face/v1.0/verify';
const apiKey = '72ae7e32f2194b5b94a88ad764b39b2b';

const headers = {
  headers: {
    'Content-Type': 'application/json',
    'Ocp-Apim-Subscription-Key': apiKey
  }
};

const detectFace = (imageURL) => {
  const postData = {
    url: imageURL
  };

  const data = JSON.stringify(postData);
  
  // request.post({
  //   headers: {'Ocp-Apim-Subscription-Key': apiKey, 'Content-Type': 'application/json'},
  //   url:     azureDetectEndpoint,
  //   body:    data
  // }, (err, res, body) => {
  //   console.log(err || JSON.parse(body));
  //   const responseBody = JSON.parse(body);
  //   return responseBody[0].faceId
  // });

  return axios.post(azureDetectEndpoint, data, headers);
    // .then((response) => {
    //   console.log(response.json);
    // })
    // .catch((error) => {
    //   throw Error(error);
    // });
};

const compareFaces = (registeredFace, newFace) => {
  const postData = {
    faceId1: registeredFace,
    faceId2: newFace
  };

  axios.post(azureVerifyEndpoint, headers, postData)
    .then((response) => {
      console.log(response);
    })
    .catch((error) => {
      throw Error(error);
    });
};

module.exports = {
  detectFace,
  compareFaces
};

