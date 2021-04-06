const db = require("../models");
const User = db.users;
const Op = db.Sequelize.Op;
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

//////////////////////////////////
// create
//////////////////////////////////
exports.create = (req, res) => {
  if (!req.body.account) {
    res.status(400).send({ message: "Content cannot be empty." });
    return;
  }
  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(req.body.password, salt);
  const user = {
    account: req.body.account,
    email: req.body.email,
    password: hash,
  };
  User.create(user)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({ message: err.message || "Some error occurred while creating the User." });
    });
};

//////////////////////////////////
// find
//////////////////////////////////
exports.findAll = (req, res) => {
  User.findAll()
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({ message: err.message || "Some error occurred while retrieving tutorials." });
    });
};

exports.findOne = (req, res) => {
  const id = req.params.id;
  User.findByPk(id)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({ message: err.message || `Error retrieving User with id=${id}` });
    });
};

exports.findByAccount = (req, res) => {
  const account = req.params.account;
  User.findOne({ where: { account: account } })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({ message: err.message || "Some error occurred retrieving users." });
    });
};

//////////////////////////////////
// update
//////////////////////////////////
exports.update = (req, res) => {
  const id = req.params.id;
  User.update(req.body, { where: { id: id } })
    .then((num) => {
      if (num === 1) {
        res.send({ message: "User was updated successfully." });
      } else {
        res.send({ message: `Cannot update User with id=${id}. Maybe User was not found or req.body is empty.` });
      }
    })
    .catch((err) => {
      res.status(500).send({ message: err.message || `Error updating User with id=${id}` });
    });
};

//////////////////////////////////
// delete
//////////////////////////////////
exports.delete = (req, res) => {
  const id = req.params.id;
  User.destroy({ where: { id: id } })
    .then((num) => {
      if (num === 1) {
        res.send({ message: "User was deleted successfully." });
      } else {
        res.send({ message: `Cannot delete User with id=${id}. maybe User was not found.` });
      }
    })
    .catch((err) => {
      res.status(500).send({ message: err.message || `Could not delete User with id=${id}` });
    });
};

exports.deleteAll = (req, res) => {
  User.destroy({ where: {}, truncate: false })
    .then((nums) => {
      res.send({ message: `${nums} Users were deleted successfully.` });
    })
    .catch((err) => {
      res.status(500).send({ message: err.message || "Some error occurred while deleting all users." });
    });
};

//////////////////////////////////
// login
//////////////////////////////////
exports.authLogin = (req, res) => {
  const account = req.body.account;
  const password = req.body.password;
  if (account && password) {
    User.findOne({ where: { account: account } })
      .then((data) => {
        const compare = bcrypt.compareSync(password, data.password);
        if (compare) {
          const userInfo = {
            account: account,
          };
          const token = jwt.sign({ userInfo }, "the_secret_key");
          res.json({
            token,
            account: userInfo.account,
          });
        }
      })
      .catch((err) => {
        res.status(500).send({ message: err.message || "Incorrect account and/or password." });
      });
  }
};
