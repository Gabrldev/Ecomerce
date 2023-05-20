export const httpError = (res, error,code=500) => {
    res.status(code).json({
        message: error.message || "Something went wrong",
    });
}