# waitroom-exercise

## requirements

- node.js v16.16.0

## Install dependencies

`npm i`

## Tests

`npm run test`

## How to run

`npm run dev`

## Migrations

### Create migration

```
# creates a migration with the name text
npm run migrate create --name text.sql
```

### Run migrations

`npm run migrate up`

### Undo last migration

`npm run migrate down`

For more information check [here](https://github.com/mmkal/slonik-tools/tree/master/packages/migrator#readme).


### OpenAI response type on completion

```JSON
{
   "id":"cmpl-5eAFSHwO3NohUKx9zGzSNVuR2vukU",
   "object":"text_completion",
   "created":1660254198,
   "model":"davinci",
   "choices":[
      {
         "text":"\n\nHe was born on November 2, 1820 in New York City",
         "index":0,
         "logprobs":null,
         "finish_reason":"length"
      }
   ],
   "usage":{
      "prompt_tokens":63,
      "completion_tokens":15,
      "total_tokens":78
   }
}
```