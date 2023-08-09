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

// userManage - handleDeleteUser
const deleteNewUserService = (userId) => {
  return axios.delete("/api/delete-user", { data: { id: userId } });
};

// ip trong userManage  edit
const editUserService = (inputData) => {
  return axios.put("/api/edit-user", inputData);
};

const getAllCodeService = (inputType) => {
  return axios.get(`/api/allcode?type=${inputType}`);
};

// doctor
const getTopDoctorHomeService = (limit) => {
  return axios.get(`/api/top-doctor-home?limit=${limit}`);
};
const getAllDoctors = () => {
  return axios.get(`/api/get-all-doctors`);
};
const saveDetailDoctorService = (data) => {
  return axios.post("/api/save-infor-doctors", data);
};
const getDetailInforDoctor = (inputId) => {
  return axios.get(`/api/get-detail-doctor-by-id?id=${inputId}`);
};
const saveBulkScheduleDoctor = (data) => {
  return axios.post("api/bulk-create-schedule", data);
};
const getScheduleDoctorByDate = (doctorId, date) => {
  return axios.get(
    `/api/get-schedule-doctor-by-date?doctorId=${doctorId}&date=${date}`
  );
};
export {
  handleLoginApi,
  getAllUsers,
  createNewUserService,
  deleteNewUserService,
  editUserService,
  getAllCodeService,
  getTopDoctorHomeService,
  getAllDoctors,
  saveDetailDoctorService,
  getDetailInforDoctor,
  saveBulkScheduleDoctor,
  getScheduleDoctorByDate,
};
