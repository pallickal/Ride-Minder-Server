import DbConn from '../src/db';

function populate_db() {
  DbConn.sync({ force: true }).then(() => {
    return DbConn.models.person.create({
      handle: 'rideminder',
      email: 'rideminder@rideminder.com'
    }).then((person) => {
      return [
        person.createVehicle({
          year: 2013,
          make: 'Honda',
          model: 'Odyssey',
          trim: 'Touring Elite',
          body_style: 'Minivan',
          color: 'Silver',
          miles: 4500,
          vin: '1JZ2093KS20320931'
        }),
        person.createVehicle({
          year: 2010,
          make: 'Subaru',
          model: 'Outback',
          trim: 'Limited',
          body_style: 'Wagon',
          color: 'Silver',
          miles: 73431,
          vin: '1JZ2093KS20320931'
        }),
        person.createVehicle({
          year: 2007,
          make: 'Honda',
          model: 'Accord',
          trim: 'EX',
          body_style: 'Sedan',
          color: 'Grey',
          miles: 83707,
          vin: '1JZ2093KS20320931'
        }),
        person.createVehicle({
          year: 2007,
          make: 'Mercedes Benz',
          model: 'C230 Kompressor',
          trim: undefined,
          body_style: 'Sedan',
          color: 'Green',
          miles: 88392,
          vin: '1JZ2093KS20320931'
        }),
        person.createVehicle({
          year: 1997,
          make: 'Acura',
          model: 'Integra',
          trim: 'LS',
          body_style: 'Coupe',
          color: 'Milano Red',
          miles: 57383,
          vin: '1JZ2093KS20320931'
        })
      ];
    });
  });
}

populate_db();
