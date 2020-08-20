const Sequelize = require('sequelize')
const db = require('../db')

const Cards = db.define('cards', {
  cardHolder: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  cardNumber: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  expDate: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  cvv: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  zipCode: {
    type: Sequelize.STRING,
    allowNull: false,
  },
})

module.exports = Cards
