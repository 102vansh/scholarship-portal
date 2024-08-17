// const user = require('../models/user.models')
// const {ErrorHandler} = require("../middleware/error");
// exports.authorizerole = async (...allowedRoles) => {
//     return (req, res, next) => {
//         if (!req.user) {
//           return res.status(401).json({ message: 'User not authenticated' });
//         }
    
//         if (allowedRoles.includes(req.user.role)) {
//           next();
//         } else {
//           res.status(403).json({ message: 'Access forbidden' });
//         }
//       };
// }

const { ErrorHandler } = require("../middleware/error");

exports.authorizerole = (...allowedRoles) => {
    return (req, res, next) => {
        if (!req.user) {
            return res.status(401).json({ message: 'User not authenticated' });
        }

        if (allowedRoles.includes(req.user.role)) {
            next();
        } else {
            res.status(403).json({ message: 'user not authorized for this role' });
        }
    };
};
