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
  let userData = await userService.handleUserLogin(email, pasword);
  return res.status(200).json({
    errCode: userData.errCode,
    message: userData.errMessage,
    user: userData ? userData.user : {},
  });
};
module.exports = {
  handleLogin: handleLogin,
};