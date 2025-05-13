class ApiErrors {
    constructor(statusCode, message = "unsuccessful", error = []) {
        this.statusCode = statusCode;
        this.message = message;
        this.error = error;
    }
}
export default ApiErrors;