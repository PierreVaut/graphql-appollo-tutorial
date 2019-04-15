# graphql-appollo-tutorial

To launch :
* git clone
* npm i
* npm start

Open your browser on http://localhost:4000/graphql


### Example of query

```
{
  getStuff {
      getFactor
      quoteOfTheDay
      random
      rollDice(numDices: 4, numSides: 124)
      time
  }
  getMeaningOfLife
}
```

### Example of mutation

```
mutation {
  setMeaningOfLife(msg: "Always look to the bright side of death!")
}
```

https://graphql.github.io/graphql-js/mutations-and-input-types/
