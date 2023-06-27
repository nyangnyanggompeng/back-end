const ChatGPTContent = (sequelize, DataTypes) => {
  const ChatGPTContent = sequelize.define(
    'ChatGPTContent',
    {
      list_id: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      sender: {
        type: DataTypes.STRING(10),
        allowNull: false
      },
      content: {
        type: DataTypes.STRING(3500),
        allowNull: false,
        defaultValue: ''
      },
      bookmark: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
      }
    },
    {
      charset: 'utf8',
      collate: 'utf8_general_ci', // 한글 저장
      timestamps: true,
      paranoid: true
    }
  );
  // ChatGPTContent.associate = db => {
  //   db.ChatGPTContent.belongsTo(db.ChatGPTList, {
  //     foreignKey: 'list_id',
  //     targetKey: 'id'
  //   });
  // };
  return ChatGPTContent;
};

export default ChatGPTContent;
