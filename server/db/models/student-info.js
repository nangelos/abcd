const Sequelize = require('sequelize')
const db = require('../db')
// need {schoolList, gradesList} from constants.js (can't use import)
//prettier-ignore
const schoolList = [
  'West Elementary','East Elementary','North Elementary','South Elementary',
]
//prettier-ignore
const gradesList = [
  'Pre-K',  'Kindergarten',  'First',  'Second',
  'Third',  'Fourth',  'Fifth',  'Sixth',
]

const StudentInfo = db.define('student-info', {
  studentFirst: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  studentLast: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  schoolName: {
    type: Sequelize.ENUM,
    values: schoolList,
    allowNull: false,
  },
  grade: {
    type: Sequelize.ENUM,
    values: gradesList,
    allowNull: false,
  },
  teacherName: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  mondayRegistered: {
    type: Sequelize.BOOLEAN,
  },
  tuesdayRegistered: {
    type: Sequelize.BOOLEAN,
  },
  wednesdayRegistered: {
    type: Sequelize.BOOLEAN,
  },
  thursdayRegistered: {
    type: Sequelize.BOOLEAN,
  },
  fridayRegistered: {
    type: Sequelize.BOOLEAN,
  },
  additionalInfo: {
    type: Sequelize.STRING(500),
  },
})

module.exports = StudentInfo