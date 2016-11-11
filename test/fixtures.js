import models, {sequelize} from '../src/sequelize/models/index';

function populateDb() {
  sequelize.sync({force: true}).then(() => {
    return models.Person.create({
      handle: 'rideminder',
      email: 'rideminder@rideminder.com'
    }).then(person => {
      return [
        person.createVehicle({
          year: 2013,
          make: 'Honda',
          model: 'Odyssey',
          trim: 'Touring Elite',
          bodyStyle: 'Minivan',
          color: 'Silver',
          miles: 4500,
          vin: '1JZ2093KS20320931'
        }),
        person.createVehicle({
          year: 2010,
          make: 'Subaru',
          model: 'Outback',
          trim: 'Limited',
          bodyStyle: 'Wagon',
          color: 'Silver',
          miles: 73431,
          vin: '1JZ2093KS20320931'
        }),
        person.createVehicle({
          year: 2007,
          make: 'Honda',
          model: 'Accord',
          trim: 'EX',
          bodyStyle: 'Sedan',
          color: 'Grey',
          miles: 83707,
          vin: '1JZ2093KS20320931'
        }),
        person.createVehicle({
          year: 2007,
          make: 'Mercedes Benz',
          model: 'C230 Kompressor',
          trim: undefined,
          bodyStyle: 'Sedan',
          color: 'Green',
          miles: 88392,
          vin: '1JZ2093KS20320931'
        }),
        person.createVehicle({
          year: 1997,
          make: 'Acura',
          model: 'Integra',
          trim: 'LS',
          bodyStyle: 'Coupe',
          color: 'Milano Red',
          miles: 57383,
          vin: '1JZ2093KS20320931'
        })
      ];
    });
  });
}

populateDb();
