'use strict'
const InfinityHttpError = require('../error/index')
const actionMapping = {
  LIST: { classMethod: 'list' },
  GET: { classMethod: 'get' },
  CREATE: { classMethod: 'create' },
  UPDATE: { classMethod: 'update' },
  DELETE: { classMethod: 'delete' }
}

class InfinityHttpController {
  constructor ({
    service = null,
    middlewareList = []
  } = Object) {
    this._service = service
    this._middlewareList = middlewareList
  }

  isAValidResource (actionList) {
    let valid = true
    for (let i in actionList) {
      let action = actionList[i]
      let classMethod = actionMapping[action].classMethod
      if (!this.hasOwnProperty(classMethod) || typeof this[classMethod] !== 'function') {
        valid = false
        break
      }
    }
    return valid
  }

  get middlewareList () {
    return this._middlewareList
  }

  getActionCallback (action) {
    let classMethod = actionMapping[action].classMethod
    return this[classMethod]
  }

  async list (req, res, next) {
    try {
      if (!this._service) throw new Error('Service is not binded to this resource')
      let result = await this._service.list(req.query, req.headers['x-page-size'], req.headers['x-page'])
      res.send(result)
    } catch (error) {
      console.error(error)
      res.send(new InfinityHttpError())
    }
  }
  async get (req, res, next) {
    try {
      if (!this._service) throw new Error('Service is not binded to this resource')
      let result = await this._service.get(req.params.id)
      res.send(result)
    } catch (error) {
      console.error(error)
      res.send(new InfinityHttpError())
    }
  }
  async create (req, res, next) {
    try {
      if (!this._service) throw new Error('Service is not binded to this resource')
      let result = await this._service.create(req.body)
      res.send(result)
    } catch (error) {
      console.error(error)
      res.send(new InfinityHttpError())
    }
  }
  async update (req, res, next) {
    try {
      if (!this._service) throw new Error('Service is not binded to this resource')
      let result = await this._service.update(req.params.id, req.body)
      res.send(result)
    } catch (error) {
      console.error(error)
      res.send(new InfinityHttpError())
    }
  }
  async delete (req, res, next) {
    try {
      if (!this._service) throw new Error('Service is not binded to this resource')
      let result = await this._service.delete(req.params.id)
      res.send(result)
    } catch (error) {
      console.error(error)
      res.send(new InfinityHttpError())
    }
  }
}

module.exports = InfinityHttpController
