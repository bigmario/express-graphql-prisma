const boom = require('@hapi/boom')

function checkRolesGql(user, ...roles) {
  if (!roles.includes(user.role)) {
    throw(boom.unauthorized('Not allowed'));
  }
}


module.exports = checkRolesGql
