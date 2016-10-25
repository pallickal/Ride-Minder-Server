import RideMinderSchema from '../src/schema';
import { should } from 'chai';
import { Source } from 'graphql/language/source';
import { parse } from 'graphql/language/parser';
import { validate } from 'graphql/validation/validate';

should();

/**
 * Helper function to test a query and the expected response.
 */
function validationErrors(query) {
  const source = new Source(query, 'RideMinder.graphql');
  const ast = parse(source);
  return validate(RideMinderSchema, ast);
}

describe('person model', function() {
  describe('mutations', function() {
    it('should add a person', function(done) {
      const query = `
      mutation {
        addPerson (handle:"cow", email:"cow2@kr.br") {
          id,
          handle,
          email
        }
      }
      `;

      console.log(validationErrors(query));
      validationErrors(query).should.be.empty;
      done();
    });
  });

  describe('query', function() {
    it('should return all people', function(done) {
      const query = `
      query peopleAndVehicles {
        people {
          id
          handle
          email
          vehicles {
            year
            make
            model
            trim
            body_style
            color
            miles
            vin
          }
        }
      }
      `;

      console.log(validationErrors(query));
      validationErrors(query).should.be.empty;
      done();
    });
  });

});
