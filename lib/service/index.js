'use strict'
const { Repository } = require('@virgilioneto/mongoose-wrapper')

class BaseService {
  constructor (model) {
    this._repository = new Repository(model)
  }

  list () {
    return this._repository.getList()
  }

  get (id) {
    return this._repository.getById(id)
  }

  create (data = {}) {
    return this._repository.create(data)
  }

  update (id, data) {
    return this._repository.update(id, data)
  }

  delete (id) {
    return this._repository.delete(id)
  }
}

module.exports = BaseService
