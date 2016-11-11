import {
  GraphQLObjectType,
  GraphQLInt,
  GraphQLString,
  GraphQLList,
  GraphQLSchema,
  GraphQLNonNull
} from 'graphql';
import {sequelize as Db} from './sequelize/models/index';
import Person from './schema/person';
import Vehicle from './schema/vehicle';

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
        type: new GraphQLObjectType({
          name: 'CreateUserResult',
          fields: {
            person: {type: Person},
            errors: {type: new GraphQLList(GraphQLString)}
          }
        }),
        args: {
          id: {
            type: new GraphQLNonNull(GraphQLInt)
          }
        },
        resolve: (root, args) => {
          return Db.models.Person.findOne({where: args}).then(person => {
            let errors = [];

            if (person) {
              return person.destroy().then(() => {
                return {person, errors};
              });
            }
            errors.push(...['id', `Cannot remove id ${args.id}`]);
            return {person, errors};
          });
        }
      }
    };
  }
});

const Schema = new GraphQLSchema({
  query: Query,
  mutation: Mutation
});

export default Schema;
