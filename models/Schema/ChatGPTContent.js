const ChatGPTContent = (sequelize, DataTypes) => {
  const ChatGPTContent = sequelize.define(
    'ChatGPTContent',
    {
      question_num: {
        type: DataTypes.INTEGER,
        defaultValue: 0
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

  return ChatGPTContent;
};

export default ChatGPTContent;
