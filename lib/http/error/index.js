'use strict'
class InfinityHttpError extends Error {
  constructor (code, message, statusCode, data = null) {
    super(message)
    this.code = code
    this.statusCode = statusCode
    this.data = data
  }

  set code (code) {
    this._code = code
  }

  get code () {
    return this._code
  }

  set statusCode (statusCode) {
    this._statusCode = statusCode
  }

  get statusCode () {
    return this._statusCode
  }

  set data (data) {
    this._data = data
  }

  get data () {
    return this._data
  }

  toJSON () {
    let json = { code: this.code, description: this.message }
    if (this.data) json['data'] = this.data
    return json
  }
}

module.exports = InfinityHttpError
