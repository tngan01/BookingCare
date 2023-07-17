import axios from "../axios";

const handleLoginApi = (userEmail, userPassword) => {
  return axios.post("api/login", { email: userEmail, password: userPassword });
};
const getAllUsers = (inputId) => {
  //templete string
  return axios.get(`/api/get-all-users?id=${inputId}`);
};

// userManage - getAllUsersFromReact
const createNewUserService = (data) => {
  console.log("check", data);
  return axios.post("/api/create-new-user", data);
};
export { handleLoginApi, getAllUsers, createNewUserService };
