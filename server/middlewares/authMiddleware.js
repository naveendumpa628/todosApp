const jwt = require('jsonwebtoken');
const jwtKey = 'VEERA1234'; //process.env.JWT_SECRET
const authMiddleware = (req, res, next) => {
    console.log('inside authMiddleware');
    const token = req.header('Authorization')?.replace('Bearer ', '');
    if (!token) return res.status(401).json({ msg: 'No token, authorization denied' });

    try {
        console.log('inside authMiddleware');
        console.log('token ' , token);
        console.log('token ' , jwtKey);
        const decoded = jwt.verify(token, jwtKey);
        console.log('inside after getToken authMiddleware', decoded);
        req.userId = decoded.userId;
        console.log('inside after getToken authMiddleware', req);
        next();
    } catch (err) {
        res.status(401).json({ msg: 'Token is not valid' });
    }
};

module.exports = authMiddleware;
