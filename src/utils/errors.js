class CustomError extends Error {
    constructor(name, statusCode, message) {
        super(message);
        this.name = name;
        this.statusCode = statusCode;
    }
}

const errorTypes = {
    VALIDATION_ERROR: 'ValidationError',
    PRODUCT_NOT_FOUND: 'ProductNotFoundError',
    CART_NOT_FOUND: 'CartNotFoundError',
    USER_NOT_FOUND: 'UserNotFoundError',
};

const errorMessages = {
    PRODUCT_NOT_FOUND: 'Product not found',
    CART_NOT_FOUND: 'Cart not found',
    USER_NOT_FOUND: 'User not found',
};

const createError = (type) => {
    const message = errorMessages[type] || 'An error occurred';
    const statusCode = type.includes('NOT_FOUND') ? 404 : 400;
    return new CustomError(type, statusCode, message);
};

module.exports = {
    CustomError,
    errorTypes,
    createError,
};