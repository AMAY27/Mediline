// Validation Middleware for Use in Routes
const validate = (validationFunction) => {
    return (req, res, next) => {
        const errors = validationFunction(req.body);

        if (errors.length > 0) {
            return res.status(400).json({
                success: false,
                message: 'Validation error',
                errors: errors,
            });
        }
        next();
    };
};

module.exports = validate;
