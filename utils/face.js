const axios = require('axios');
// const request = require('request');

const azureDetectEndpoint = 'https://westcentralus.api.cognitive.microsoft.com/face/v1.0/detect?returnFaceId=true&returnFaceLandmarks=false';
const azureVerifyEndpoint = 'https://westcentralus.api.cognitive.microsoft.com/face/v1.0/verify';
const apiKey = '11817f53c28a46c489c290e8c6daaf7c';

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

  return axios.post(azureDetectEndpoint, data, headers);
};

const compareFaces = (registeredFace, newFace) => {
  const postData = {
    faceId1: registeredFace,
    faceId2: newFace
  };

  const data = JSON.stringify(postData);

  return axios.post(azureVerifyEndpoint, data, headers);
};

module.exports = {
  detectFace,
  compareFaces
};

