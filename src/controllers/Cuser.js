const connection = require("../configs/db");
const userModel = require("../models/Muser");
const helpers = require("../helpers/helpers");
const jwt = require("jsonwebtoken");
const { v4: uuidv4 } = require("uuid");
const emailActivation = require("../helpers/emailActivation");
const ActivationCustommer = require("../helpers/ActivationCustommer");
const ActivationSeller = require("../helpers/ActivationSeller");
const emailForgotCust = require("../helpers/emailForgotCust");
const { hash } = require("bcrypt");
const refresh = require("../helpers/refresh");
bcrypt = require("bcryptjs");

//get data from database ===============================
const getAllUser = (req, res, next) => {
  userModel
    .getAllUser()
    .then((result) => {
      const user = result;
      helpers.response(res, user, 200);
    })
    .catch((error) => {
      // console.log(error);
      helpers.response(res, null, 500, { message: "internal server error" });
    });
};
// =====================================================================
const Register_buyer = async (req, res, next) => {
  const { name, email, password } = req.body;

  const buyer = await userModel.findBuyer(email);
  if (email == "" || password == "") {
    helpers.response(res, null, 500, { message: "Data can't be empty" });
  } else if (buyer.length > 0) {
    return helpers.response(res, null, 401, {
      message: "This email address is already being used",
    });
  }
  bcrypt.genSalt(10, function (err, salt) {
    bcrypt.hash(password, salt, function (err, hash) {
      // Store hash in your password DB.
      // console.log(hash);
      const data = {
        idCustommer: uuidv4(),
        name: name,
        email: email,
        password: hash,
        status: "inactive",
        role: "custommer",
      };
      userModel
        .Register_buyer(data)
        .then((result) => {
          delete data.password;
          jwt.sign(
            { email: data.email },
            process.env.SECRET_KEY,
            function (err, token) {
              ActivationCustommer.envoiEmail(data.email, data.name, token);
            }
          );

          helpers.response(res, data, 200, {
            message: "registration success! check your email for activation ",
          });
        })
        .catch((error) => {
          console.log(error);
          helpers.response(res, null, 500, {
            message: "internal server error",
          });
        });
    });
  });
};
//Login Buyer---------------------------------------
const Login_buyer = async (req, res, next) => {
  const { email, password } = req.body;
  const result = await userModel.findBuyer(email);
  const user = result[0];
  if (email == "" || password == "") {
    helpers.response(res, null, 500, {
      message: "Email or Password can not be empty",
    });
  } else if (result < 1) {
    return helpers.response(res, null, 500, {
      message:
        "We couldn't find an account that matched the one you entered. please try again",
    });
  }
  bcrypt.compare(password, user.password, function (err, resCompare) {
    if (!resCompare) {
      return helpers.response(res, null, 401, { message: "Password wrong" });
    }

    // generate token
    jwt.sign(
      { email: user.email, role: "custommer" },
      process.env.SECRET_KEY,
      { expiresIn: "24h" },
      async function (err, token) {
        console.log(token);
        console.log(process.env.SECRET_KEY);
        delete user.password;
        const dataPayload = {
          email: user.email,
          role: user.role,
        };
        user.token = await refresh.generateToken(dataPayload);
        user.refreshToken = await refresh.generateRefreshToken(dataPayload);
        helpers.response(res, user, 200);
      }
    );
  });
};
// ========================================================================
const forgotPassCust = (req) => {
  const email = req.body.email;
  console.log(email);
  if (email === "") {
    helpers.response(res, null, 500, { message: "Email required" });
  }
  jwt.sign({ email: email }, process.env.SECRET_KEY, function (err, token) {
    emailForgotCust.sendEmail(email, token);
  });
};

// ========================================================================
const Register_seller = async (req, res, next) => {
  const { name, email, phone_number, store_name, password } = req.body;

  const seller = await userModel.findSeller(email);
  if (seller.length > 0) {
    return helpers.response(res, null, 401, {
      message: "This email address is already being used",
    });
  }
  bcrypt.genSalt(10, function (err, salt) {
    bcrypt.hash(password, salt, function (err, hash) {
      const data = {
        idSeller: uuidv4(),
        name: name,
        email: email,
        phone_number: phone_number,
        store_name: store_name,
        password: hash,
        status: "inactive",
        role: "seller",
      };
      userModel
        .Register_seller(data)
        .then((result) => {
          delete data.password;
          jwt.sign(
            { email: data.email },
            process.env.SECRET_KEY,
            function (err, token) {
              ActivationSeller.envoyerEmail(data.email, data.name, token);
            }
          );

          helpers.response(res, data, 200, { message: "registered success!" });
        })
        .catch((error) => {
          console.log(error);
          helpers.response(res, null, 500, {
            message: "internal server error",
          });
        });
    });
  });
};
//-----------------------------------------------------------
const Login_seller = async (req, res, next) => {
  const { email, password } = req.body;
  const result = await userModel.findSeller(email);
  const user = result[0];
  if (email == "" || password == "") {
    helpers.response(res, null, 500, {
      message: "Email or Password can not be empty",
    });
  } else if (result < 1) {
    return helpers.response(res, null, 500, {
      message:
        "We couldn't find an account that matched the one you entered. please try again",
    });
  }
  bcrypt.compare(password, user.password, function (err, resCompare) {
    if (!resCompare) {
      return helpers.response(res, null, 401, { message: "Password wrong" });
    }

    // generate token
    jwt.sign(
      { email: user.email, role: "seller" },
      process.env.SECRET_KEY,
      { expiresIn: "24h" },
      async function (err, token) {
        console.log(token);
        console.log(process.env.SECRET_KEY);
        delete user.password;
        user.token = token;
        const dataPayload = {
            email: user.email,
            role: user.role,
          };
          user.token = await refresh.generateToken(dataPayload);
          user.refreshToken = await refresh.generateRefreshToken(dataPayload);
          helpers.response(res, user, 200);
      }
    );
  });
};
// REGISTER ==========================================================
const Register = async (req, res, next) => {
  const { userName, email, password, role } = req.body;

  const user = await userModel.findUser(email);

  if (user.length > 0) {
    return helpers.response(res, null, 401, {
      message: "This email address is already being used",
    });
  }

  console.log(user);
  bcrypt.genSalt(10, function (err, salt) {
    bcrypt.hash(password, salt, function (err, hash) {
      const data = {
        idUser: uuidv4(),
        userName: userName,
        email: email,
        password: hash,
        status: 0,
        role: role,
      };
      userModel
        .Register(data)
        .then((result) => {
          delete data.password;
          jwt.sign(
            { email: data.email },
            process.env.SECRET_KEY,
            function (err, token) {
              emailActivation.sendEmail(data.email, data.userName, token);
            }
          );

          helpers.response(res, data, 200, {
            message: "registered success! check your email for activation ",
          });
        })
        .catch((error) => {
          console.log(error);
          helpers.response(res, null, 500, {
            message: "internal server error",
          });
        });
    });
  });
};
// LOGIN ==========================================================

const Login = async (req, res, next) => {
  const { email, password, role, status } = req.body;
  const result = await userModel.findUser(email);
  const user = result[0];
  if (email == "" || password == "") {
    helpers.response(res, null, 500, {
      message: "Email or Password can not be empty",
    });
  } else if (result < 1) {
    return helpers.response(res, null, 500, {
      message:
        "We couldn't find an account that matched the one you entered. please try again",
    });
  }

  bcrypt.compare(password, user.password, function (err, resCompare) {
    if (!resCompare) {
      return helpers.response(res, null, 401, { message: "Password wrong" });
    }

    // generate token
    jwt.sign(
      { email: user.email, role },
      process.env.SECRET_KEY,
      { expiresIn: "24h" },
      function (err, token) {
        console.log(token);
        console.log(process.env.SECRET_KEY);
        delete user.password;
        user.token = token;
        helpers.response(res, user, 200);
      }
    );
  });
};

//==========================================================
const updateUser = (req, res, next) => {
  const { userName, email } = req.body;
  const id = req.params.id;
  const data = {
    userName: userName,
    email: email,
    // password : password
  };
  userModel
    .updateUser(id, data)
    .then(() => {
      res.json({
        message: "data berhasil di Update",
        data: data,
      });
    })
    .catch((error) => {
      console.log(error);
      res.status(500);
      res.json({
        message: "internal server error",
      });
    });
};
//--------------------------------------------------------
// change password custommer
// const changePastCust = async (req, res, next)=>{
//     const {password} = req.body
//     const email = req.params.email
//     // const user = await userModel.findUser(email)
//     const data = {
//         password : password
//     }
//     // if(email !== user.length()){
//     //     helpers.response(res, null, 500, {message: "can't found email that matched "})
//     // }
//     console.log(data);
//     bcrypt.genSalt(10, function(err, salt) {
//         bcrypt.hash(password , salt, function(err, hash) {
//             const data = {
//                 password : hash
//             }
//             userModel.updatePassword(email, data)
//             .then(()=>{
//                 delete data.password
//                 helpers.response(res, data , 200, {message: "Password has been changed"})

//             })
//             .catch((error)=>{
//                 console.log(error);
//                 helpers.response(res, null, 500, {message: 'internal server error'})
//             })
//         });
//     });
// }

//delete product============================================

const deleteUser = (req, res) => {
  const id = req.params.id;
  userModel
    .deleteUser(id)
    .then(() => {
      res.status(200);
      res.json({
        message: "data berhasil dihapus",
      });
    })
    .catch(() => {
      console.log(err);
      res.status(500);
      res.json({
        message: "internal server error",
      });
    });
};
//========================================================
const userActivation = (req, res, next) => {
  const token = req.params.token;
  if (token) {
    try {
      jwt.verify(token, process.env.SECRET_KEY, function (err, decoded) {
        if (err) {
          console.log(e);
          return helpers.response(res, null, 500, {
            message: "something went wrong",
          });
        } else {
          email = decoded.email;
          console.log(email);
          userModel
            .updateStatus(email)
            .then(() => {
              helpers.response(res, null, 200, {
                message: "Your account has been successfully verified",
              });
              // res.redirect('http://localhost3000/login')
            })
            .catch((err) => {
              console.log(err);
              return helpers.response(res, null, 500, {
                message: "there's something wrong..",
              });
            });
        }
      });
    } catch (err) {
      console.log(err);
      return helpers.response(res, null, 500, {
        message: "something went wrong..",
      });
    }
  }
};
//--------------------------------------------------------
const custActivation = (req, res, next) => {
  const token = req.params.token;
  if (token) {
    try {
      jwt.verify(token, process.env.SECRET_KEY, function (err, decoded) {
        if (err) {
          console.log(e);
          return helpers.response(res, null, 500, {
            message: "something went wrong",
          });
        } else {
          email = decoded.email;
          console.log(email);
          userModel
            .updateStatusCust(email)
            .then(() => {
              // helpers.response(res, null, 200, {message: "Your account has been successfully verified"})
              res.redirect("https://blanja-silk.vercel.app/activation_custommer");
            })
            .catch((err) => {
              console.log(err);
              return helpers.response(res, null, 500, {
                message: "there's something wrong..",
              });
            });
        }
      });
    } catch (err) {
      console.log(err);
      return helpers.response(res, null, 500, {
        message: "something went wrong..",
      });
    }
  }
};
//--------------------------------------------------------
const sellerActivation = (req, res, next) => {
  const token = req.params.token;
  if (token) {
    // try{

    jwt.verify(token, process.env.SECRET_KEY, function (err, decoded) {
      if (err) {
        console.log(e);
        return helpers.response(res, null, 500, {
          message: "something went wrong",
        });
      } else {
        email = decoded.email;
        console.log(email);
        userModel
          .updateStatusSeller(email)
          .then(() => {
            // helpers.response(res, null, 200, {message: "Your account has been successfully verified"})
            res.redirect("https://blanja-silk.vercel.app//activation_custommer");
          })
          .catch((err) => {
            console.log(err);
            return helpers.response(res, null, 500, {
              message: "there's something wrong..",
            });
          });
      }
    });
    // } catch (err) {
    //    console.log(err);
    //    return helpers.response(res, null, 500, {message: 'something went wrong..'})
    // }
  }
};
//========================================================
const changePassword = (req, res, next) => {
  const { password, token } = req.body;
  jwt.verify(token, process.env.SECRET_KEY, function (err, decoded) {
    if (err) {
      console.log(e);
      return helpers.response(res, null, 500, {
        message: "something went wrong",
      });
    } else {
      bcrypt.genSalt(10, function (err, salt) {
        bcrypt.hash(password, salt, function (err, hash) {
          const data = {
            password: hash,
          };
          userModel
            .changePasswordCust(email, data)
            .then(() => {
              delete data.password;
              return helpers.response(res, null, 200, { message: "success" });
            })
            .catch((error) => {
              console.log(error);
              helpers.response(res, null, 500, {
                message: "internal server error",
              });
            });
        });
      });
    }

    // const email = decoded.email
    // userModel.changePasswordCust(email)
    // .then(()=>{
    //     return helpers.response(res, null, 200, {message:'success'})
    // })
    // .catch((error)=>{
    //     console.log(error);
    //     return helpers.response(res, null, 500, {message:'internal server error'})
    // })
  });
};
//========================================================

const RefreshToken = async (req, res) => {
  try {
    const verifyOptions ={
       issuer: 'Blanja-E-commerce' 
    }
    const refreshToken = req.body.refreshToken;
    const decoded = await jwt.verify(refreshToken, process.env.SECRET_KEY, verifyOptions)
    const newDataPayload =  {
        email: decoded.email,
        role: decoded.role
    }
    const newToken = await refresh.generateToken(newDataPayload);
    const newRefreshToken = await refresh.generateRefreshToken(newDataPayload)
    const result={
        token: newToken,
        refreshToken: newRefreshToken
    }
    helpers.response(res, result, 200)
  } catch (error) {
      helpers.response(res, {message: 'internal server error'}, 500)
  }
};
module.exports = {
  getAllUser,
  Register,
  updateUser,
  deleteUser,
  Login,
  userActivation,
  Register_buyer,
  custActivation,
  // changePastCust,
  Login_buyer,
  changePassword,
  Register_seller,
  sellerActivation,
  Login_seller,
  forgotPassCust,
  RefreshToken
};
