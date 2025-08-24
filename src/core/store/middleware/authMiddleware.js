const authMiddleware = () => (next) => (action) => next(action)

export default authMiddleware


