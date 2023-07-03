import Sequelize from 'sequelize';
import User from './Schema/User.js';
import ChatGPTList from './Schema/ChatGPTList.js';
import ChatGPTContent from './Schema/ChatGPTContent.js';
import Post from './Schema/Post.js';
import Comment from './Schema/Comment.js';

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
db.Post = Post(sequelize, Sequelize);
db.Comment = Comment(sequelize, Sequelize);

// User - ChatGPTList
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

// ChatGPTList - ChatGPTContent
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

// User - Post
db.User.hasMany(db.Post, {
  foreignKey: 'user_id',
  targetKey: 'id',
  onDelete: 'cascade'
});
db.Post.belongsTo(db.User, {
  foreignKey: 'user_id',
  targetKey: 'id',
  onDelete: 'cascade'
});
db.User.hasMany(db.Post, {
  foreignKey: 'isAdmin',
  targetKey: 'isAdmin',
  onDelete: 'cascade'
});
db.Post.belongsTo(db.User, {
  foreignKey: 'isAdmin',
  targetKey: 'isAdmin',
  onDelete: 'cascade'
});

// User - Comment
db.User.hasMany(db.Comment, {
  foreignKey: 'user_id',
  targetKey: 'id',
  onDelete: 'cascade'
});
db.Comment.belongsTo(db.User, {
  foreignKey: 'user_id',
  targetKey: 'id',
  onDelete: 'cascade'
});
db.User.hasMany(db.Comment, {
  foreignKey: 'isAdmin',
  targetKey: 'isAdmin',
  onDelete: 'cascade'
});
db.Comment.belongsTo(db.User, {
  foreignKey: 'isAdmin',
  targetKey: 'isAdmin',
  onDelete: 'cascade'
});

// Post - Comment
db.Post.hasMany(db.Comment, {
  foreignKey: 'post_id',
  targetKey: 'id',
  onDelete: 'cascade'
});
db.Comment.belongsTo(db.Post, {
  foreignKey: 'post_id',
  targetKey: 'id',
  onDelete: 'cascade'
});

export default db;
