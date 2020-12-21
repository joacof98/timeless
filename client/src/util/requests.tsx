import axios from "axios";

const registerUser = async (userInfo: UserRegisterInput) => {
  return await axios
    .post(`http://localhost:4000/users/register`, userInfo)
    .then((response) => {
      return response.data;
    })
    .catch(err => {
      return({"error": err.response.data})
    })
};

const loginUser = async (userInfo: UserLoginInput) => {
  return await axios
    .post(`http://localhost:4000/users/login`, userInfo)
    .then((response) => {
      return response.data;
    })
    .catch(err => {
      return({"error": err.response.data})
    })
};
export {registerUser, loginUser}