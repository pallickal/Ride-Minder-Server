import {
  GraphQLObjectType,
  GraphQLInt,
  GraphQLString
} from 'graphql';
import Person from './person';

const Vehicle = new GraphQLObjectType({
  name: 'Vehicle',
  description: 'This represents a Vehicle',
  fields: () => {
    return {
      id: {
        type: GraphQLInt,
        resolve(vehicle) {
          return vehicle.id;
        }
      },
      person: {
        type: Person,
        resolve(vehicle) {
          return vehicle.getPerson();
        }
      },
      year: {
        type: GraphQLInt,
        resolve(vehicle) {
          return vehicle.year;
        }
      },
      make: {
        type: GraphQLString,
        resolve(vehicle) {
          return vehicle.make;
        }
      },
      model: {
        type: GraphQLString,
        resolve(vehicle) {
          return vehicle.model;
        }
      },
      trim: {
        type: GraphQLString,
        resolve(vehicle) {
          return vehicle.trim;
        }
      },
      bodyStyle: {
        type: GraphQLString,
        resolve(vehicle) {
          return vehicle.bodyStyle;
        }
      },
      color: {
        type: GraphQLString,
        resolve(vehicle) {
          return vehicle.color;
        }
      },
      miles: {
        type: GraphQLInt,
        resolve(vehicle) {
          return vehicle.miles;
        }
      },
      vin: {
        type: GraphQLString,
        resolve(vehicle) {
          return vehicle.vin;
        }
      }
    };
  }
});

export default Vehicle;
