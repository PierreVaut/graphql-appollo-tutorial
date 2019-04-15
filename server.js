var express = require('express');
var graphqlHTTP = require('express-graphql');
var { buildSchema } = require('graphql');

var schema = buildSchema(`
    type MyStuff {
        quoteOfTheDay: String!
        random: Float!
        rollDice(numDices: Int!, numSides: Int): [Int]
        time: String
        getFactor: Int!
    }

    type Query {
        getMeaningOfLife: String
        getStuff(factor: Int): MyStuff
    }

  
    type Mutation {
        setMeaningOfLife(msg: String): String
    }

`);

class MyStuff {
    constructor(factor) {
        this.factor = factor || 1;
    }
    getFactor() {
        return this.factor
    }
    quoteOfTheDay () {
      return Math.random() < 0.5 ? 'Take it easy' : 'Salvation lies within';
    }

    random () {
        return Math.floor(Math.random() * 10**this.factor);
    }

    rollDice ({numDices, numSides}) {
        const output = [];
        for (let i = 0; i < numDices ; i++) {
            output.push(1 + Math.floor(Math.random() * numSides))
        }
        return output
    }

    time () {
        return (new Date()).toUTCString()
    }
};

var fakeDatabase = {
    meaningOfLife: "Look at the bright side of life"
};

var root = {
    getStuff: ({ factor }) => { 
        return new MyStuff(factor)
        
    },
    getMeaningOfLife: _ => fakeDatabase.meaningOfLife,
    setMeaningOfLife: ({ msg }) => {
        console.log(msg)
        fakeDatabase.meaningOfLife = msg
        return msg
    }
}

var app = express();
app.use('/graphql', graphqlHTTP({
  schema: schema,
  rootValue: root,
  graphiql: true,
}));
app.listen(4000);
console.log('Running a GraphQL API server at localhost:4000/graphql');