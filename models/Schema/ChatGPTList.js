const ChatGPTList = (sequelize, DataTypes) => {
  const ChatGPTList = sequelize.define(
    'ChatGPTList',
    {
      name: {
        type: DataTypes.STRING(20),
        allowNull: false //필수
      },
      type: {
        type: DataTypes.STRING(10),
        defaultValue: ''
      }
    },
    {
      charset: 'utf8',
      collate: 'utf8_general_ci', // 한글 저장
      timestamps: true,
      paranoid: true
    }
  );

  return ChatGPTList;
};

export default ChatGPTList;
