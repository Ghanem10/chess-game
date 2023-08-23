import { StatusCodes } from 'http-status-codes';

export class CustomError extends Error {
    constructor(message) {
        super(message);
    }
}

export class BadRequest extends CustomError {
    constructor(message) {
        super(message);
        this.codeStatus = StatusCodes.BAD_REQUEST;
    }
}


export class Unauthorized extends CustomError {
    constructor(message) {
        super(message);
        this.codeStatus = StatusCodes.UNAUTHORIZED;
    }
}

export class NotFound extends CustomError {
    constructor(message) {
        super(message);
        this.codeStatus = StatusCodes.NOT_FOUND;
    }
}