# hello-node

> Simple server for test

## Commands

```zsh
$ make help
Usage: 

 build    build the application
 run      run the application(card)
 test     run tests
 lint     check everything's okay
 format   format files
 help     prints this help message
```

## APIs

### GET /

```text
👋 Hello there?
```

### GET /v1/time

```json
{
  "timestamp": 1592404155,
  "timestamp_ms": 1592404155293,
  "time_human": "2020-06-17T23:29:15.293000000+00:00"
}
```

### GET /v1/msa

Micro service 간 Tracing 을 체크하기 위해 사용하면 좋을 Endpoint.  
Related ENV
* TARGET_HOST: Endpoint 내에서 API 요청을 보낼 target server host
* HEADER_PREFIXES_FOR_PROPAGATION: `TARGET_HOST` 에 API 요청을 보낼 때 함께 전달 할 header prefix. `,` 로 분리하여 여러개를 넣을 수 있다.
* DELAY_MS_BETWEEN_REQUEST_TO_TARGET: target server 에 요청을 보내기 전/후로 가질 delay

TARGET_HOST 역시 `hello-node` 이어야 아래처럼 깔끔하게 떨어진다.

```json
{
  "name": "RootServiceName",
  "headers": { "headers_from": "request" },
  "history": [
    { "name":  "RootServiceName", "headers": { "headers_from": "request" } },
    { "name":  "TargetServiceName", "headers":  {} },
  ]
}
```
