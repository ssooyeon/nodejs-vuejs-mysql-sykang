module.exports = (sequelize, Sequelize) => {
  const User = sequelize.define("user", {
    account: {
      type: Sequelize.STRING,
    },
    password: {
      type: Sequelize.STRING,
    },
  });
  return User;
};
