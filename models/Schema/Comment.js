const Comment = (sequelize, DataTypes) => {
  const Comment = sequelize.define(
    'Comment',
    {
      writer: {
        type: DataTypes.STRING(10),
        allowNull: false //필수
      },
      content: {
        type: DataTypes.TEXT,
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

  return Comment;
};

export default Comment;
