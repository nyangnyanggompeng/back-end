const User = (sequelize, DataTypes) => {
  const User = sequelize.define(
    'User',
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
      },
      isAdmin: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        primaryKey: true
      },
      username: {
        type: DataTypes.STRING(20),
        allowNull: false, //필수
        unique: true
      },
      domain: {
        type: DataTypes.STRING(20),
        allowNull: false //필수
      },
      password: {
        type: DataTypes.STRING(12),
        allowNull: false //필수
      },
      nickname: {
        type: DataTypes.STRING(8),
        allowNull: false,
        unique: true
      },
      auth_email: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
      }
    },
    {
      charset: 'utf8',
      collate: 'utf8_general_ci' // 한글 저장
    }
  );
  // User.associate = db => {
  //   db.User.hasMany(db.ChatGPTList, { foreignKey: 'user_id', sourceKey: 'id' });
  // };
  // User.associate = (db) => {
  // 	db.User.hasMany(db.Post);
  // 	db.User.hasMany(db.Comment);
  // 	db.User.belongsToMany(db.Post, { through: "Like", as: "Liked" });
  // 	db.User.belongsToMany(db.User, { through: "Follow", as: "Followers", foreignKey: "followingId" });
  // 	db.User.belongsToMany(db.User, { through: "Follow", as: "Followings", foreignKey: "followerId" });
  // };
  return User;
};

export default User;
