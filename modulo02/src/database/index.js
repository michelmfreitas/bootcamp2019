import Sequelize from 'sequelize';

//import Models
import User from '../app/models/User';

//import database config
import databaseconfig from '../config/database';

//define models
const models = [User];

class Database {
  constructor() {
    this.init();
  }

  init() {
    this.connection = new Sequelize(databaseconfig);

    models.map(model => model.init(this.connection));
  }
}

export default new Database();
