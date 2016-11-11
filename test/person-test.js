import chai, {expect} from 'chai';
import dirtyChai from 'dirty-chai';
import {graphql} from 'graphql';
import {Source} from 'graphql/language/source';
import {parse} from 'graphql/language/parser';
import {validate} from 'graphql/validation/validate';

import models from '../src/sequelize/models/index';
import Schema from '../src/schema';

chai.use(dirtyChai);

/**
 * Helper function to test a query and the expected response.
 */
function validationErrors(query) {
  const source = new Source(query, 'RideMinder.graphql');
  const ast = parse(source);
  return validate(Schema, ast);
}

describe('person schema', function () {
  describe('people', function () {
    describe('validation tests', function () {
      it('should validate', function (done) {
        const query = `
        query {
          people {
            id
            handle
            email
          }
        }
        `;
        expect(validationErrors(query), validationErrors(query)).to.be.empty();
        done();
      });
    });

    describe('execution tests', function () {
      it('should return at least one person', function (done) {
        const query = `
        query { people { id } }
        `;
        graphql(Schema, query).then(result => {
          expect(result.errors, result.errors).to.be.empty();
          expect(result.data.people).to.not.be.empty();
          expect(result.data.people[0]).to.be.an('object');
          expect(result.data.people[0].id).to.be.a('number');
          done();
        });
      });
    });
  });

  describe('addPerson', function () {
    describe('validation tests', function () {
      it('should validate', function (done) {
        const query = `
        mutation {
          addPerson (handle:"someone", email:"someperson@emailprovider.br") {
            id,
            handle,
            email
          }
        }
        `;
        expect(validationErrors(query), validationErrors(query)).to.be.empty();
        done();
      });

      it('should not validate unless handle is specified', function (done) {
        const query = `
        mutation {
          addPerson (email: "someperson@emailprovider.br") {
            id,
            handle,
            email
          }
        }
        `;
        expect(validationErrors(query)).to.not.be.empty();
        done();
      });

      it('should not validate unless email is specified', function (done) {
        const query = `
        mutation {
          addPerson (handle: "someperson") {
            id,
            handle,
            email
          }
        }
        `;
        expect(validationErrors(query)).to.not.be.empty();
        done();
      });
    });

    describe('execution test', function () {
      it('should return a person', function (done) {
        const query = `
        mutation {
          addPerson (
            handle:"someone",
            email:"someperson@emailprovider.br"
          ) {
            id,
            handle,
            email
          }
        }
        `;
        graphql(Schema, query).then(function (result) {
          expect(result.errors, result.errors).to.be.empty();
          expect(result.data.addPerson.id).to.be.a('number');
          expect(result.data.addPerson.handle).to.equal('someone');
          expect(result.data.addPerson.email).to.equal(
            'someperson@emailprovider.br'
          );
          done();
        });
      });

      it('should error when email is invalid', function (done) {
        const query = `
        mutation {
          addPerson (
            handle:"someoneelse",
            email:"someotherpersonemailprovider.br"
          ) {
            id,
            handle,
            email
          }
        }
        `;
        graphql(Schema, query).then(function (result) {
          expect(result.errors).to.not.be.empty();
          done();
        });
      });
    });
  });

  describe('removePerson', function () {
    describe('validation tests', function () {
      it('should validate', function (done) {
        const query = `
        mutation {
          removePerson (id: 73) {
            person {
              id,
              handle,
              email
            }
          }
        }
        `;
        expect(validationErrors(query)).to.be.empty();
        done();
      });
    });

    describe('execution tests', function () {
      it('should return removed person', function (done) {
        const query = `
        mutation {
          removePerson (id: 2) {person {id, handle, email}, errors}
        }
        `;
        graphql(Schema, query).then(result => {
          expect(result.errors, result.errors).to.be.empty();
          expect(result.data.removePerson.errors).to.be.empty();
          expect(result.data.removePerson.person).to.not.be.empty();
          expect(result.data.removePerson.person.id).to.be.a('number');
          expect(result.data.removePerson.person.handle).to.be.a('string');
          expect(result.data.removePerson.person.email).to.be.a('string');
          done();
        });
      });

      it('should also remove owned vehicles', function (done) {
        let vehicleIds;
        models.Person.find({
          where: {id: 1},
          include: [models.Vehicle]
        }).then(result => {
          vehicleIds = result.Vehicles.map(vehicle => vehicle.id);
          const query = `
          mutation {
            removePerson (id: 1) {
              person {
                id,
                handle,
                email,
                vehicles { id }
              },
              errors
            }
          }
          `;
          graphql(Schema, query).then(result => {
            expect(result.errors, result.errors).to.be.empty();
            models.Vehicle.findAll(
              {where: {id: vehicleIds}}
            ).then(result => {
              expect(result).to.be.empty();
              done();
            });
          });
        });
      });
    });
  });
});
