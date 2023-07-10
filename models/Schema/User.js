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
        allowNull: false //필수
      },
      domain: {
        type: DataTypes.STRING(20),
        allowNull: false //필수
      },
      password: {
        type: DataTypes.TEXT,
        allowNull: false //필수
      },
      nickname: {
        type: DataTypes.STRING(8),
        allowNull: false,
        unique: true
      },
      authEmail: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
      },
      useStatus: {
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

  return User;
};

export default User;
