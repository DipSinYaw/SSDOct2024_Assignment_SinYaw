// // middlewares/hashPassword.js
// const bcrypt = require("bcrypt");
//
// async function hashPassword(req, res, next) {
//     if (req.body.password) {
//         try {
//             const salt = await bcrypt.genSalt(10);
//             req.body.password = await bcrypt.hash(req.body.password, salt);
//         } catch (error) {
//             return res.status(500).json({ message: "Error hashing password" });
//         }
//     }
//     next(req, res, next);
// }
//
// module.exports = hashPassword;