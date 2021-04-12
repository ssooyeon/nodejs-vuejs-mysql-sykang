const db = require("../models");
const Board = db.boards;
const User = db.users;
const Op = db.Sequelize.Op;

//////////////////////////////////
// create
//////////////////////////////////
exports.create = (req, res) => {
  if (!req.body.title) {
    res.status(400).send({ message: "Content cannot be empty." });
    return;
  }
  const board = req.body;
  Board.create(board)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({ message: err.message || "Some error occurred while creating the Board." });
    });
};

//////////////////////////////////
// find
//////////////////////////////////
exports.findAll = (req, res) => {
  Board.findAll({
    include: [
      {
        model: User,
        as: "user",
      },
    ],
    order: [["createdAt", "DESC"]],
  })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({ message: err.message || "Some error occurred while retrieving boards." });
    });
};

exports.findOne = (req, res) => {
  const id = req.params.id;
  Board.findByPk(id, {
    include: [
      {
        model: User,
        as: "user",
      },
    ],
  })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({ message: err.message || `Error retrieving Board with id=${id}` });
    });
};

exports.findByTitle = (req, res) => {
  const title = req.params.title;
  Board.findOne({ where: { title: title } })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({ message: err.message || "Some error occurred retrieving boards." });
    });
};

exports.findAllByTitle = (req, res) => {
  const title = req.params.title;
  Board.findAll({
    include: [
      {
        model: User,
        as: "user",
      },
    ],
    where: {
      title: {
        [Op.like]: "%" + title + "%",
      },
    },
  })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({ message: err.message || "Some error occurred retrieving boards." });
    });
};

//////////////////////////////////
// update
//////////////////////////////////
exports.update = (req, res) => {
  const id = req.params.id;
  Board.update(req.body, { where: { id: id } })
    .then((num) => {
      if (num === 1) {
        res.send({ message: "Board was updated successfully." });
      } else {
        res.send({ message: `Cannot update Board with id=${id}. Maybe Board was not found or req.body is empty.` });
      }
    })
    .catch((err) => {
      res.status(500).send({ message: err.message || `Error updating Board with id=${id}` });
    });
};

//////////////////////////////////
// delete
//////////////////////////////////
exports.delete = (req, res) => {
  const id = req.params.id;
  Board.destroy({ where: { id: id } })
    .then((num) => {
      if (num === 1) {
        res.send({ message: "Board was deleted successfully." });
      } else {
        res.send({ message: `Cannot delete Board with id=${id}. maybe Board was not found.` });
      }
    })
    .catch((err) => {
      res.status(500).send({ message: err.message || `Could not delete Board with id=${id}` });
    });
};

exports.deleteAll = (req, res) => {
  Board.destroy({ where: {}, truncate: false })
    .then((nums) => {
      res.send({ message: `${nums} Boards were deleted successfully.` });
    })
    .catch((err) => {
      res.status(500).send({ message: err.message || "Some error occurred while deleting all boards." });
    });
};
