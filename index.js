'use strict';

const AWS = require('aws-sdk');
const iot = new AWS.Iot();
const sts = new AWS.STS();

exports.handler = (event, context, callback) => {
    iot.describeEndpoint({}, (err, data) => {
        if (err) {
            return callback(err);
        }

        const iotEndpoint = data.endpointAddress;
        const region = process.env.AWS_DEFAULT_REGION;
        const roleSessionName = Math.floor(Math.random() * Math.floor(999999)).toString();

        // Get the details about the IAM user or role whose credentials are used to call the operation.
        sts.getCallerIdentity({}, (err, data) => {
            if (err) {
                return callback(err);
            }

            const roleArn = `arn:aws:iam::${
                data.Account
            }:role/${
                process.env.AWS_IAM_ROLE_NAME
            }`;

            const params = {
                RoleArn: roleArn,
                RoleSessionName: roleSessionName
            };

            // Returns a set of temporary security credentials that you can use to access AWS resources.
            sts.assumeRole(params, (err, data) => {
                if (err) {
                    return callback(err);
                }

                callback(null, {
                    statusCode: 200,
                    headers: {
                        'Access-Control-Allow-Origin': '*'
                    },
                    body: JSON.stringify(
                        {
                            iotEndpoint: iotEndpoint,
                            region: region,
                            accessKey: data.Credentials.AccessKeyId,
                            secretKey: data.Credentials.SecretAccessKey,
                            sessionToken: data.Credentials.SessionToken
                        }
                    )
                })
            });
        });
    });
};
