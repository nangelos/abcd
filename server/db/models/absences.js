const Sequelize = require('sequelize')
const db = require('../db')

const Absences = db.define('absences', {
  studentFirst: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  studentLast: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  year: {
    type: Sequelize.STRING,
  },
  month: {
    type: Sequelize.STRING,
  },
  date: {
    type: Sequelize.STRING,
  },
  absent: {
    type: Sequelize.BOOLEAN,
  },
})

module.exports = Absences
