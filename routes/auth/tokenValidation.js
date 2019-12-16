const { verify } = require('jsonwebtoken');

module.exports = {
    checkToken: (req, res, next) => {
        let token = req.get("authorization");

        if(token) {
            token = token.slice(7);
            verify(token, process.env.TOKEN, (err, decoded) => {
                // console.log(decoded.result.id);
                if (err) {
                    res.status(401).json({
                        success: 0,
                        message: "Invalid token"
                    });
                } else {
                    res.locals.user = decoded.result;
                    next();
                }
            });
        } else {
            res.status(401).json({
                sucess: 0,
                message: "Acess denied! Unauthorized user"
            });
        }
    }
}