const ChatGPTList = (sequelize, DataTypes) => {
  const ChatGPTList = sequelize.define(
    'ChatGPTList',
    {
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: false
      }
    },
    {
      charset: 'utf8',
      collate: 'utf8_general_ci', // 한글 저장
      timestamps: true,
      paranoid: true
    }
  );
  // ChatGPTList.associate = db => {
  //   db.ChatGPTList.belongsTo(db.User, {
  //     foreignKey: 'user_id',
  //     targetKey: 'id'
  //   });
  //   db.ChatGPTList.hasMany(db.ChatGPTContent, {
  //     foreignKey: 'list_id',
  //     sourceKey: 'id'
  //   });
  // };
  return ChatGPTList;
};

export default ChatGPTList;
