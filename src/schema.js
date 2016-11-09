import {
  GraphQLObjectType,
  GraphQLInt,
  GraphQLString,
  GraphQLList,
  GraphQLSchema,
  GraphQLNonNull
} from 'graphql';

import {sequelize as Db} from './sequelize/models/index.js';

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
      body_style: {
        type: GraphQLString,
        resolve(vehicle) {
          return vehicle.body_style;
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

const Query = new GraphQLObjectType({
  name: 'Query',
  description: 'This is a root query.',
  fields: () => {
    return {
      people: {
        type: new GraphQLList(Person),
        resolve(root, args) {
          return Db.models.Person.findAll({where: args});
        }
      },
      vehicles: {
        type: new GraphQLList(Vehicle),
        resolve(root, args) {
          return Db.models.Vehicle.findAll({where: args});
        }
      }
    };
  }
});

const Mutation = new GraphQLObjectType({
  name: 'Mutation',
  description: 'Functions to create and update objects.',
  fields: () => {
    return {
      addPerson: {
        type: Person,
        args: {
          handle: {
            type: new GraphQLNonNull(GraphQLString)
          },
          email: {
            type: new GraphQLNonNull(GraphQLString)
          }
        },
        resolve: (root, args) => {
          return Db.models.Person.create({
            handle: args.handle,
            email: args.email
          });
        }
      },
      removePerson: {
        type: Person,
        args: {
          id: {
            type: new GraphQLNonNull(GraphQLInt)
          }
        },
        resolve: (root, args) => {
          return Db.models.Person.findOne({where: args}).then((person) =>
            {
              if (!person) { throw `Could not find person with id ${args.id}` };
              return person.destroy().then(() => { return person });
            });
        }
      }
    }
  }
});

const Schema = new GraphQLSchema({
  query: Query,
  mutation: Mutation
});

export default Schema;
