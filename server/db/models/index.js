const User = require('./user')
const ParentInfo = require('./parent-info')
const StudentInfo = require('./student-info')

//Associations
ParentInfo.belongsTo(User)
StudentInfo.belongsTo(User)

/**
 * We'll export all of our models here, so that any time a module needs a model,
 * we can just require it from 'db/models'
 * for example, we can say: const {User} = require('../db/models')
 * instead of: const User = require('../db/models/user')
 */
module.exports = {
  User,
  ParentInfo,
  StudentInfo,
}
