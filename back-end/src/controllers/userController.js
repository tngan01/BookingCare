import userService from "../services/userService";

let handleLogin = async (req, res) => {
  let email = req.body.email;
  let pasword = req.body.password;
  //  kt email co ton tai khong
  //  so sanh pw
  //  return thong tin nd
  //  access_token: jwt

  if (!email || !pasword) {
    return res.status(500).json({
      errCode: 1,
      message: "Missing inputs parameter!",
    });
  }

  // dung user,pw
  let userData = await userService.handleUserLogin(email, pasword);
  return res.status(200).json({
    errCode: userData.errCode,
    message: userData.errMessage,
    user: userData.user ? userData.user : {},
  });
};

// get all users
let handleGetAllUsers = async (req, res) => {
  let id = req.query.id; //all, id
  // kt users
  if (!id) {
    return res.status(200).json({
      errCode: 1,
      errMessage: "Missing required parameters",
      users: [],
    });
  }
  let users = await userService.getAllUsers(id);
  return res.status(200).json({
    errCode: 0,
    errMessage: "Ok",
    users,
  });
};

// create new user
let handleCreateNewUser = async (req, res) => {
  let message = await userService.createNewUser(req.body);
  return res.status(200).json(message);
};

// edit user
let handleEditUser = async (req, res) => {
  let data = req.body; //lay tat ca cac input da dat name
  let message = await userService.updateUserData(data);
  return res.status(200).json(message);
};

// delete user
let handleDeleteNewUser = async (req, res) => {
  if (!req.body.id) {
    return res.status(200).json({
      errCode: 1,
      errMessage: "Missing requires parameters!",
    });
  }
  let message = await userService.deleteUser(req.body.id);
  return res.status(200).json(message);
};

module.exports = {
  handleLogin: handleLogin,
  handleGetAllUsers: handleGetAllUsers,
  handleCreateNewUser: handleCreateNewUser,
  handleEditUser: handleEditUser,
  handleDeleteNewUser: handleDeleteNewUser,
};
