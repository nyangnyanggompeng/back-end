import Sequelize from 'sequelize';
import User from './Schema/User.js';
import ChatGPTList from './Schema/ChatGPTList.js';
import ChatGPTContent from './Schema/ChatGPTContent.js';

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
db.Sequelize = Sequelize;
db.User = User(sequelize, Sequelize);
db.ChatGPTList = ChatGPTList(sequelize, Sequelize);
db.ChatGPTContent = ChatGPTContent(sequelize, Sequelize);

// 아래 예시처럼 작성하면 Post에 userID 추가됨
// db.User.hasMany(db.Post);
// db.Post.belongsTo(db.User);

db.User.hasMany(db.ChatGPTList, {
  foreignKey: 'user_id',
  sourceKey: 'id',
  onDelete: 'cascade'
});
db.ChatGPTList.belongsTo(db.User, {
  foreignKey: 'user_id',
  targetKey: 'id',
  onDelete: 'cascade'
});
db.ChatGPTList.hasMany(db.ChatGPTContent, {
  foreignKey: 'list_id',
  sourceKey: 'id',
  onDelete: 'cascade'
});
db.ChatGPTContent.belongsTo(db.ChatGPTList, {
  foreignKey: 'list_id',
  targetKey: 'id',
  onDelete: 'cascade'
});

export default db;
