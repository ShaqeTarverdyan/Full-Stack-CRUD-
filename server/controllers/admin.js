const Admin = require("../models/admin");
const bcrypt = require('bcrypt');
const sequelize = require('../util/database');
const jwt = require('jsonwebtoken');

exports.registerNewAdmin = (req,res,next) => {
    const {firstname, lastname, email, password, role} = req.body;
    bcrypt
    .hash(password, 12)
    .then(hashedpassword => {
        Admin.create({
            firstname: firstname,
            lastname: lastname,
            email: email,
            hashedPassword: hashedpassword,
            role: role
        }).then(result => {
            res.send(result);
        }).catch(err => {
            console.log(err)
        })
    }) 
};

// exports.loginAdmin = (req,res,next) => {
//     const { email, password } = req.body;
//     console.log('req.body',req.body)
//     Admin.findOne({
//         where: {
//             email: email
//         }
//     })
//     .then(admin => {
//         if(!admin) {
//             console.log('not found :(')
//         } else {
//             bcrypt.compare(password, admin.hashedPassword, (err, result) => {
//                 if(result === true) {
//                     res.send(admin)
//                 } else {
//                     res.send('Incorrect password')
//                 }
//             })
//         }
//     })
// };

exports.loginAdmin = (req, res, next) => {
    Admin.findOne({ email: req.body.email }).then(
      (user) => {
        if (!user) {
          return res.status(401).json({
            error: new Error('User not found!')
          });
        }
        bcrypt.compare(req.body.password, user.hashedPassword).then(
          (valid) => {
            if (!valid) {
              return res.status(401).json({
                error: new Error('Incorrect password!')
              });
            }
            const token = jwt.sign(
              { userId: user._id },
              'RANDOM_TOKEN_SECRET',
              { expiresIn: '24h' });
            res.status(200).json({
              userId: user._id,
              token: token
            });
          }
        ).catch(
          (error) => {
            res.status(500).json({
              error: error
            });
          }
        );
      }
    ).catch(
      (error) => {
        res.status(500).json({
          error: error
        });
      }
    );
  }

exports.getAdmins = (req,res, next) => {
    console.log('rrr', req.body)
    Admin
        .findAll()
        .then(result => {
            console.log('lalalalal',result)
            res.send(result)
        })
        .catch(err => {
            console.log(err)
        })
}