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

### GET /time
```json
{
  "timestamp": 1592404155,
  "timestamp_ms": 1592404155293,
  "time_human": "2020-06-17T23:29:15.293000000+00:00"
}
```
