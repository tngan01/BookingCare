import db from "../models/index";
import bcrypt from "bcryptjs";

const salt = bcrypt.genSaltSync(10);

let hashUserPassword = (password) => {
  // dam bao ham luon tra kq: resolve- td return moi viec ok thi giai quyet duoc van de  , reject: tu choi
  // async, await: dam bao chay theo dung trinh tu
  return new Promise(async (resolve, reject) => {
    try {
      let hashPassword = await bcrypt.hashSync(password, salt);
      resolve(hashPassword);
    } catch (e) {
      reject(e);
    }
  });
};

let handleUserLogin = (email, password) => {
  return new Promise(async (resolve, reject) => {
    try {
      let userData = {};

      let isExit = await checkUserEmail(email);

      if (isExit) {
        let user = await db.User.findOne({
          attributes: ["email", "roleId", "password"],
          where: { email: email },
          raw: true,
        });

        // kt user co ton tai kh
        if (user) {
          // so sanh pw
          let check = await bcrypt.compareSync(password, user.password);
          if (check) {
            userData.errCode = 0;
            userData.errMessage = "Ok";
            // co nd thi xoa pw va tra user
            delete user.password;
            userData.user = user;
          } else {
            //
            userData.errCode = 3;
            userData.errMessage = `Wrong password`;
          }
        } else {
          userData.errCode = 2;
          userData.errMessage = `User's not found`;
        }
      } else {
        // return loi
        userData.errCode = 1;
        userData.errMessage = `You's Email isn't exist in your system. Please try other email!`;
      }
      resolve(userData);
    } catch (e) {
      reject(e);
    }
  });
};

let checkUserEmail = (userEmail) => {
  return new Promise(async (resolve, reject) => {
    try {
      let user = await db.User.findOne({
        where: { email: userEmail },
      });
      if (user) {
        resolve(true);
      } else {
        resolve(false);
      }
    } catch (e) {
      reject(e);
    }
  });
};

let getAllUsers = (userId) => {
  return new Promise(async (resolve, reject) => {
    try {
      let users = "";
      if (userId === "ALL") {
        users = await db.User.findAll({
          attributes: {
            exclude: ["password"], //ngoai tru pw
          },
        });
      }
      if (userId && userId !== "ALL") {
        users = await db.User.findOne({
          where: { id: userId },
          attributes: {
            exclude: ["password"], //ngoai tru pw
          },
        });
      }
      resolve(users);
    } catch (e) {
      reject(e);
    }
  });
};

// handleCreateNewUser
let createNewUser = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      // kt email co ton tai khong
      let check = await checkUserEmail(data.email);

      if (check === true) {
        resolve({
          errCode: 1,
          errMessage:
            "Your email is already in used, please try another email!",
        });
      } else {
        //
        let hashPasswordFromBcrypt = await hashUserPassword(data.password);
        await db.User.create({
          email: data.email,
          password: hashPasswordFromBcrypt,
          firstName: data.firstName,
          lastName: data.lastName,
          address: data.address,
          phonenumber: data.phonenumber,
          gender: data.gender === 1 ? true : false,
          roleId: data.roleId,
        });
        resolve({
          errCode: 0,
          message: "Ok",
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};

//handleEditUser

let updateUserData = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      // tim user theo id
      if (!data.id) {
        resolve({
          errCode: 2,
          errMessage: "Missing required parameters",
        });
      }

      let user = await db.User.findOne({
        where: { id: data.id },
        raw: false,
      });
      //cap nhat user theo bien data truyen vao
      if (user) {
        // luu thong tin
        user.firstName = data.firstName;
        user.lastName = data.lastName;
        user.address = data.address;

        await user.save();

        resolve({
          errCode: 0,
          message: "Update the user succeeds!",
        });
      } else {
        resolve({
          errCode: 1,
          errMessage: `User's not found!`,
        });
      }

      await db.User.update({});
    } catch (e) {
      reject(e);
    }
  });
};

//handleDeletetUser

let deleteUser = (userId) => {
  return new Promise(async (resolve, reject) => {
    let foundUser = await db.User.findOne({
      where: { id: userId },
    });
    if (!foundUser) {
      resolve({
        errCode: 2,
        errMessage: `The user isn't exist`,
      });
    }
    await db.User.destroy({
      where: { id: userId },
    });
    resolve({
      errCode: 0,
      message: `The user is deleted`,
    });
  });
};
module.exports = {
  handleUserLogin: handleUserLogin,
  getAllUsers: getAllUsers,
  createNewUser: createNewUser,
  hashUserPassword: hashUserPassword,
  updateUserData: updateUserData,
  deleteUser: deleteUser,
};
