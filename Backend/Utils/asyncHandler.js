

// handle error more gracefully and take fn as argument
const asyncHandler = (fn) => {
    return async (req, res, next) => {
        try {
            await fn(req, res, next);
        } catch (error) {
            console.error("Error", error);
            res.status(500).json({
                message: error.message,
                sucess: false
            });
        }
    }
}
export default asyncHandler;
