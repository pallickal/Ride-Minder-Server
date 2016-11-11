import express from 'express';
import graphqlHTTP from 'express-graphql';
import Schema from './schema';

const APP_PORT = 3080;

const app = express();

app.use('/graphql', graphqlHTTP({
  schema: Schema,
  pretty: true,
  graphiql: true
}));

app.listen(APP_PORT, () => {
  console.log(`Ride Minder server listening on port ${APP_PORT}.`);
});
