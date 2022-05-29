// connexion sequalize
const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASS,
  {
    host: process.env.DB_HOST,
    dialect: 'mysql',
  },
);

const user = require('./User')(sequelize, Sequelize.DataTypes);
const post = require('./Post')(sequelize, Sequelize.DataTypes);
const comment = require('./Comment')(sequelize, Sequelize.DataTypes);
const reaction = require('./Reaction')(sequelize, Sequelize.DataTypes);
const report = require('./Report')(sequelize, Sequelize.DataTypes);

sequelize.User = user;
sequelize.Post = post;
sequelize.Comment = comment;
sequelize.Reaction = reaction;
sequelize.Report = report;

user.hasMany(post, { onDelete: 'cascade', onUpdate: 'cascade' });
user.hasMany(comment, { onDelete: 'cascade', onUpdate: 'cascade' });
user.hasMany(reaction, { onDelete: 'cascade', onUpdate: 'cascade' });
user.hasMany(report, { onDelete: 'cascade', onUpdate: 'cascade' });

post.hasMany(comment, { onDelete: 'cascade', onUpdate: 'cascade' });
post.hasMany(reaction, { onDelete: 'cascade', onUpdate: 'cascade' });
post.hasMany(report, { onDelete: 'cascade', onUpdate: 'cascade' });
post.belongsTo(user);

comment.hasMany(reaction, { onDelete: 'cascade', onUpdate: 'cascade' });
comment.hasMany(report, { onDelete: 'cascade', onUpdate: 'cascade' });
comment.belongsTo(user);
comment.belongsTo(post);

reaction.belongsTo(post);
reaction.belongsTo(user);
reaction.belongsTo(comment);

report.belongsTo(user);
report.belongsTo(post);
report.belongsTo(comment);

sequelize
  .authenticate()
  .then(async () => {
    console.log('✅ Connexion à MySQL valide');
    // Synchronisation des models avec les tables dans la base de données
    await sequelize.sync({ alter: true })
      .catch(() => console.log('Impossible de synchroniser les models'));
    console.log('Tous les models ont été synchronisés avec succès.');
  })
  .catch((error) => console.log('❌ Connexion à MySQL invalide', error));
module.exports = sequelize;
