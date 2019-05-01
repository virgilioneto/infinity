'use strict'
const actionMapping = {
  LIST: { httpMethod: 'get', params: '' },
  GET: { httpMethod: 'get', params: '/:id' },
  CREATE: { httpMethod: 'post', params: '' },
  UPDATE: { httpMethod: 'patch', params: '/:id' },
  DELETE: { httpMethod: 'del', params: '/:id' }
}

class InfinityHttpRouter {
  constructor (server) {
    this._cache = {}
    this._server = server
  }

  addResource (resourcePath, resourceClassPath, resourceActions = ['LIST', 'GET', 'CREATE', 'UPDATE', 'DELETE']) {
    let ResourceClassRef
    let resourceClass
    if (this._cache.hasOwnProperty(resourcePath)) return
    if (!isResourceActionsValid(resourceActions)) {
      throw new Error('Invalid resource actions')
    }
    ResourceClassRef = require(resourceClassPath)
    resourceClass = new ResourceClassRef()
    if (isResourceClassValid(resourceClass, resourceActions)) {
      throw new Error(`Invalid resource ${resourceClassPath}`)
    }
    this._cache[resourcePath] = true
    for (let i in resourceActions) {
      let action = resourceActions[i]
      let httpMethod = actionMapping[action].httpMethod
      let params = actionMapping[action].params
      this._server[httpMethod](
        `${resourcePath}${params}`,
        resourceClass.middlewareList,
        resourceClass.getActionCallback(action).bind(resourceClass)
      )
    }
  }
}

function isResourceActionsValid (resourceActions) {
  if (!resourceActions || !Array.isArray(resourceActions)) return false
  return true
}

function isResourceClassValid (resourceClass, resourceActions) {
  if (!resourceClass) return false
  if (!resourceClass.hasOwnProperty('isAValidResource') || typeof resourceClass.isAValidResource !== 'function') return false
  if (!resourceClass.hasOwnProperty('getMiddlewareList') || typeof resourceClass.getMiddlewareList !== 'function') return false
  if (!resourceClass.hasOwnProperty('getActionCallback') || typeof resourceClass.getActionCallback !== 'function') return false
  if (!resourceClass.isAValidResource(resourceActions)) return false
  return true
}

module.exports = InfinityHttpRouter
