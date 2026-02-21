const jwt = require('jsonwebtoken')
const JWT_SECRET = "hvday6ert72839289@aiyg8t87qt72393293883uhefiuh78ttq3ifi78272jdsds039[]]pou89ywe";
const meetingUser = require('../model/meetingUser');

const autMiddleware = async (req, res, next) => {
    let token;
    const auth = req.headers.authorization || req.headers.Authorization || '';
    if (auth && auth.startsWith('Bearer')) {
        token = auth.split(" ")[1];
        if (!token) {
            return res.status(401).json({ message: 'No token, authorization denied.' })
        }
        try {
            const decode = jwt.verify(token, JWT_SECRET);
            const user = await meetingUser.findOne({ _id: decode._id }, { _id: 1, userName: 1, role: 1 });
            if (!user._id) {
                return res.status(401).json({ message: 'Invalid user id in token' });
            }
            req.user = user;
            next();
        } catch (error) {
            if (error.name === 'TokenExpiredError') {
                return res.status(401).json({ message: 'Token expired' });
            }
            return res.status(401).json({ message: 'Token is not valid.' })
        }
    } else {
        return res.status(400).json({ message: 'Token is not valid.' })
    }
}

module.exports = autMiddleware;