'use strict'

const statusCode = {
    FORBIDDEN: 403,
    CONFLICT: 409
}

const ReasonStatusCode = {
    FORBIDDEN: 'Bad request error',
    CONFLICT: 'Conflict error'
}

class ErrorResponse extends Error {
    constructor(message,status){
        super(message)
        this.status = status;
        
    }
}

class ConflictRequestError extends ErrorResponse {
    constructor(message = ReasonStatusCode.CONFLICT,statusCode = ReasonStatusCode.FORBIDDEN){
        super(message,statusCode)


    }
}

class BadRequestError extends ErrorResponse {
    constructor(message = ReasonStatusCode.CONFLICT,statusCode = ReasonStatusCode.FORBIDDEN){
        super(message,statusCode)


    }
}

module.exports = {
    ConflictRequestError,
    BadRequestError
}