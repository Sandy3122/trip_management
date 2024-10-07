class Response {
    constructor() {}

    success(statuscode, data, msg) {
        let responsedata = { code: statuscode, result: data, message: msg };
        return responsedata;
    }

    error(statuscode, data, msg) {
        let responsedata = { code: statuscode, errorMessage: msg, errorCode: data ? data.errCode : "" };
        return responsedata;
    }
}

module.exports = new Response();
