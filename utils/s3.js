const aws = require('aws-sdk');

const s3 = new aws.S3();

const putObject = (filename, file) => {
  const params = {
    ACL: 'public-read',
    Body: file,
    Bucket: 'boaty-faces',
    Key: filename,
    ServerSideEncryption: 'AES256',
    StorageClass: 'STANDARD_IA'
  };

  return new Promise((resolve, reject) => {
    s3.putObject(params, (error, data) => {
      if (error) reject(error);
      resolve(data);
    });
  });
};

module.exports = { putObject };
