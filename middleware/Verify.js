const jwt = require("jsonwebtoken");

const verify = (req, res, next) => {
     const headers = req.headers.authorization;
     if (headers) {
          const token = headers;
          jwt.verify(token, "shhhhhsecret", (err, user) => {
               if (err) {
                    return res.status(403).json("Token is not valid");
               }
               req.user = user;
               next();
          });
     } else {
          return res.status(501).send({ status: 501, message: "Your are not authenticated!" });
     }
};
module.exports = { verify };
