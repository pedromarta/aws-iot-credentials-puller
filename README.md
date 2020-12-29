# aws-iot-credentials-puller
Simple AWS Serverless Application Model API to get the necessary credentials for the IoT Core device SDK usage.

### Getting started

- Install the [AWS SAM CLI](https://docs.aws.amazon.com/serverless-application-model/latest/developerguide/serverless-sam-cli-install.html)
- Test
- Deploy

### Testing

- Function
```sh
$ sam local start-function
```

- API
```sh
$ sam local start-api
```

If parameters were set in the template file, remember to pass the `--parameter-override` argument with the respective values.

### Deployment

- Add the `--guided` argument on the 1st deployment. `samconfig.toml` will be created from the provided values
```sh
$ sam deploy --guided
```

- Add the `--stack-name` argument and respective value on subsequent deployments.
```sh
$ sam deploy --stack-name example
```
