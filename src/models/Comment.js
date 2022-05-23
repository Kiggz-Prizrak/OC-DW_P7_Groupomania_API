module.exports = (Sequelize, DataTypes) =>
  // eslint-disable-next-line implicit-arrow-linebreak
  Sequelize.define('Comment', {
    content: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    media: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  });
