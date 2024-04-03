# chzzk-streaming-graphql
치지직 비공식 API 를 AWS + Lambda + Graphql 로 전환하기 위한 프로젝트입니다.

## 1. Getting Started
AWS Credentials 설정을 완료해주세요. 하단 링크를 통해 IAM 권한 설정을 부여바랍니다.

https://www.serverless.com/framework/docs/providers/aws/guide/credentials

권한 정책은 아래와 같이 부여합니다.
필요 권한만 부여하고 싶다면 별도로 설정해주세요.

- AmazonAPIGatewayAdministrator
- AmazonAPIGatewayPushToCloudWatchLogs
- AmazonS3FullAccess
- AWSAppSyncPushToCloudWatchLogs
- AWSCloudFormationFullAccess
- AWSCodeDeployRoleForLambda
- IAMReadOnlyAccess

모든 권한부여가 완료되었다면 serverless에 인증정보를 설정하세요
```bash
sls config credentials --provider aws --key {공개키} --secret {비공개키}
```

## 2. Testing
테스트는 아래와 같은 명령어로 실행해주세요. 테스트에 사용할 `.json` 은 별도로 생성해주세요.

```bash
sls invoke local -f {serverless.yml - functions 에 작성된 함수명} -p {실행할 json 정보}

# Example
sls invoke local -f graphql -p query.json
```

## 3. Deploy
배포는 아래 명령어로 실행해주세요. 오류 발생시 `cloudformation` 에서 확인 할 수 있습니다.

```bash
sls deploy
```