const jwt = require('jsonwebtoken');


const checkAuth = (req, res, next) => {


    try {
        let token = req.headers.authorization.split(" ")[1];
        let decoded = jwt.verify(token, process.env.jwt_KEY);
        req.userId = decoded.userId
        next()
    }
    catch (err) {
        return res.status(520).json({
            messege: 'please login first ! '
        })
    }




}


module.exports = checkAuth;