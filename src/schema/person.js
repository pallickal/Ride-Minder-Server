import {
  GraphQLObjectType,
  GraphQLInt,
  GraphQLString,
  GraphQLList
} from 'graphql';
import Vehicle from './vehicle';

const Person = new GraphQLObjectType({
  name: 'Person',
  description: 'This represents a Person',
  fields: () => {
    return {
      id: {
        type: GraphQLInt,
        resolve(person) {
          return person.id;
        }
      },
      handle: {
        type: GraphQLString,
        resolve(person) {
          return person.handle;
        }
      },
      email: {
        type: GraphQLString,
        resolve(person) {
          return person.email;
        }
      },
      vehicles: {
        type: new GraphQLList(Vehicle),
        resolve(person) {
          return person.getVehicles();
        }
      }
    };
  }
});

export default Person;
