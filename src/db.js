import Sequelize from 'sequelize';

const Conn  = new Sequelize(
  'rideminder',
  process.env.PGUSER,
  process.env.PGPASSWORD,
  {
    dialect: 'postgres',
    host: 'postgres'
  }
);

const Person = Conn.define('person', {
  handle: {
    type: Sequelize.STRING,
    allowNull: false
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      isEmail: true
    }
  }
});

const Vehicle = Conn.define('vehicle', {
  year: {
    type: Sequelize.STRING,
    allowNull: true
  },
  make: {
    type: Sequelize.STRING,
    allowNull: false
  },
  model: {
    type: Sequelize.STRING,
    allowNull: true
  },
  trim: {
    type: Sequelize.STRING,
    allowNull: true
  },
  body_style: {
    type: Sequelize.STRING,
    allowNull: true
  },
  color: {
    type: Sequelize.STRING,
    allowNull: true
  },
  miles: {
    type: Sequelize.STRING,
    allowNull: true
  },
  vin: {
    type: Sequelize.STRING,
    allowNull: true
  }
});

Person.hasMany(Vehicle);
Vehicle.belongsTo(Person);

export default Conn;
