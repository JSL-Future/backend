const Sequelize = require('sequelize')
const { isEmpty, concat } = require('ramda')

const { Op } = Sequelize
const { iLike } = Op

const iLikeOperation = values => {
  if (isEmpty(values)) {
    return null
  }

  return ({
    [iLike]: concat(concat('%', values), '%')
  })
}

const removeFiledsNilOrEmpty = values => {
  const fields = values
  const fieldFormmat = Object.keys(fields)
  .reduce((curr, prev) => {
    if (!curr[prev] && fields[prev]) {
      curr = {
        ...curr,
        [prev]: fields[prev]
      }
    }
    return curr
  }, {})

  return fieldFormmat
}

module.exports = {
  iLikeOperation,
  removeFiledsNilOrEmpty,
}
