module.exports = (Sequelize, DataTypes) =>
  // eslint-disable-next-line implicit-arrow-linebreak
  Sequelize.define(
    'Reaction',
    {
      type: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    },
  );
