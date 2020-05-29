const Sequelize = require('sequelize')
const db = require('../db')

const ParentInfo = db.define('parent-info', {
  parentFirst: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  parentLast: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  parentCell: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false,
  },
  parentWork: {
    type: Sequelize.STRING,
  },
  parentEmail: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false,
  },
  parentAddress: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  parentCity: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  parentState: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  parentZip: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  eContactName1: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  eContactPhone1: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  eContactName2: {
    type: Sequelize.STRING,
  },
  eContactPhone2: {
    type: Sequelize.STRING,
  },
})

module.exports = ParentInfo

/**
 * instanceMethods
 */

/**
 * classMethods
 */

/**
 * hooks
 */
