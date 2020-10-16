const Admin = require("../models/admin");
const bcrypt = require('bcrypt');
const { validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
const mailer = require("../util/nodemailer");

exports.registerNewAdmin = (req,res,next) => {
    const {firstname, lastname, email, password, role} = req.body;
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
      const error = new Error('Validation Failed!.entered data is not correct!')
      error.statusCode = 422;
      error.data = errors.array();
      throw error;

    }
    bcrypt
    .hash(password, 12)
    .then(hashedpassword => {
        Admin.create({
            firstname: firstname,
            lastname: lastname,
            email: email,
            password: hashedpassword,
            role: role,
            isActive: false
        }).then(result => {
            let superAdmins = [];
            Admin.findAll({
              where: {
                role: 'super'
              }
            }).then(res => {
              res.map(item => {
                superAdmins.push(item.dataValues.email)
            });
            })
          const message = {
            to: superAdmins,
            subject: 'Congradulation, you are successfuly registered',
            html: `
              <a href="http://localhost:3000/accept-panel-admins-page">got throw this link and activate</a>
            `
          }
            mailer(message)
            res.status(201).json({
              message: 'Successfuly created new Admin!',
              data: result.id
            });
        }).catch(err => {
            if(!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        })
    }) 
};

exports.loginAdmin = (req, res, next) => {
  const email = req.body.email;
  let loadeAdmin;
    Admin
    .findOne({ 
      where: {
        email: email
      }
    })
    .then(user => {
        if (!user) {
          const error = new Error('A user with this email could not be found!');
          error.statusCode = 401;
          throw error;
        }
        loadeAdmin = user;
        if(loadeAdmin.dataValues.isActive === false) {
          const error = new Error();
          error.statusCode = 403;
          error.message = 'your status is not activated yet:('
          throw error
        }
        return bcrypt.compare(req.body.password, user.password);
      })
      .then(isEqual => {
        console.log('isEqualisEqual', isEqual)
        if(!isEqual) {
          const error = new Error();
          error.statusCode = 401;
          error.message = 'Wrong password :(';
          throw error;
        }
        const token = jwt.sign({
          email: loadeAdmin.email,
          adminId: loadeAdmin.id.toString()
        },
          'RANDOM_TOKEN_SECRET',
          {expiresIn: '1h'}
        );
        res.status(200).json({token: token, admin_id: loadeAdmin.id});
      }).catch(
        (error) => {
          res.status(500).json({
            error: error
          });
        }
    );
  };

exports.getAdmins = (req,res, next) => {
    Admin
        .findAll()
        .then(admins => {
            res.status(200).json({
              message: 'Fetched Admins successfuly.',
              admins: admins
            })
        })
        .catch(err => {
          if(!err.statusCode) {
            err.statusCode = 500;
          }
          next(err);
        })
};

exports.getAdmin = (req, res, next) => {
  const adminId = req.params.adminId;
  Admin.findOne({
    where: {
      id: adminId
    }
  })
    .then(admin => {
      if(!admin) {
        const error = new Error('Could not find admin.');
        error.statusCode = 404;
        throw error;
      }
      res.status(200).json({
        message: 'Admin fetched.',
        admin: admin
      })
    })
    .catch(err => {
      if(!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    })

};

exports.updateAdmin = (req,res,next) => {
  const { id,firstname, lastname, email } = req.body;
  const errors = validationResult(req);
    if(!errors.isEmpty()) {
      const error = new Error('Validation Failed!.entered data is not correct!')
      error.statusCode = 422;
      throw error;
      
    }
  Admin.findOne({
    where: {
      id: id
    }
  })
  .then(admin => {
    if(!admin) {
      const error = new Error('Could not find admin !');
      error.statusCode = 404;
      throw error;
    }
    admin.firstname = firstname,
    admin.lastname = lastname;
    admin.email = email;
    admin.role = 'super';
    return admin.save();
  })
  .then(updatedAdmin => {
    res.status(200).json({
      message: 'Admin updated successfuly !',
      admin: updatedAdmin
    })
  })
  .catch(err => {
    if(!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  })
};

exports.deleteAdmin = (req, res, next) => {
  const adminId = req.params.adminId;
  const errors = validationResult(req);
  if(!errors.isEmpty()) {
    const error = new Error('Validation Failed!.entered data is not correct!')
    error.statusCode = 422;
    throw error;
  }
  Admin
    .destroy({
      where: {
        id: adminId
      }
    })
    .then(result => {
      res.status(200).json({message: 'Successfuly deleted!'})
    })
    .catch(err => {
        if(!err.statusCode) {
          err.statusCode = 500;
        }
        next(err);
    })
}

exports.togglePanelAdminStatus = (req, res, next) => {
  const id = req.params.id;
  const isActive = req.body.isActive;
  const errors = validationResult(req);
  if(!errors.isEmpty()) {
    const error = new Error('Validation Failed!.entered data is not correct!')
    error.statusCode = 422;
    throw error;
    
  }
  Admin.findOne({
    where: {
      id: id
    }
  })
  .then(admin => {
    if(!admin) {
      const error = new Error('Could not find admin !');
      error.statusCode = 404;
      throw error;
    }
    admin.isActive = isActive;
    return admin.save();
  })
  .then(result => {
    res.status(200).json({
      message: `The admins status is successfuly changed !`,
      data: result
    })
  })
  .catch(err => {
    if(!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  })
}