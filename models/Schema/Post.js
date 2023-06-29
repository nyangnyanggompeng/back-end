const Post = (sequelize, DataTypes) => {
  const Post = sequelize.define(
    'Post',
    {
      writer: {
        type: DataTypes.STRING(10)
      },
      title: {
        type: DataTypes.STRING(30),
        allowNull: false
      },
      content: {
        type: DataTypes.TEXT,
        allowNull: false
      },
      num_of_comment: {
        type: DataTypes.INTEGER,
        defaultValue: 0
      }
    },
    {
      charset: 'utf8',
      collate: 'utf8_general_ci', // 한글 저장
      timestamps: true,
      paranoid: true
    }
  );

  return Post;
};

export default Post;
