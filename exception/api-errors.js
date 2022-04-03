module.exports = class ApiError extends Error {
    status;
    // message;
    errors;
    constructor(status, message, errors = []) {
        super(message)
        this.status = status
        this.errors = errors
    }

    static UnauthorizedError() {
        return new ApiError(401, 'Пользователь не авторизован')
    }

    static BadRequest(message, errors = []) {
        return new ApiError(400, message, errors)
    }

    static Expired() {
        return new ApiError(403, "У вас нет доступа")
    }

    static Locked() {
        return new ApiError(423, "Что то пошло не так ")
    }

    static Confirm() {
        return new ApiError(406, "Ваша аккаунт не подтверждена, пожалуйста, зарегистрируйтесь снова")
    }

}