'use strict';

import fs from 'fs';
import path from 'path';
import Seq from 'sequelize';
import cfg from '../config';

var env = process.env.NODE_ENV || 'development';
var config = cfg[env];
var basename = path.basename(module.filename);
const models = {};
var seq;

if (config.use_env_variable) {
  seq = new Seq(process.env[config.use_env_variable]);
} else {
  seq = new Seq(config.database, config.username, config.password, config);
}

fs
  .readdirSync(__dirname)
  .filter(function (file) {
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
  })
  .forEach(function (file) {
    var model = seq.import(path.join(__dirname, file));
    models[model.name] = model;
  });

Object.keys(models).forEach(function (modelName) {
  if (models[modelName].associate) {
    models[modelName].associate(models);
  }
});

export const sequelize = seq;
export const Sequelize = Seq;
export default models;
