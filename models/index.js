import Sequelize from 'sequelize';
import User from './Schema/User.js';
const env = process.env.NODE_ENV || 'development'; // 추후 배포할 때는 process.env.NODE_ENV를 production으로 설정
import cfg from '../config/config.json' assert { type: 'json' };
const config = cfg[env];

const db = {};

const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  config
);

db.sequelize = sequelize;
db.User = User(sequelize, Sequelize);

export default db;
