
export const role = (req, res, next) => {
    if (req.decoded.role === 'admin') {
        next();
    } else {
        res.status(401).json('Invalid')
    }
}