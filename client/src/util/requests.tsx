import axios from "axios";

const token = localStorage.getItem('jwtToken')
const jwtHeader = { Authorization: `Bearer ${token}` }

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

const getUser = async (username: String) => {
  return await axios
    .get(`http://localhost:4000/users/${username}`)
    .then((response) => {
      return response.data;
    })
    .catch(err => {
      return({"error": err.response.data})
    })
};

const followProfileUser = async (info: FollowRequest) => {
  return await axios
    .post('http://localhost:4000/users/follow', info, {headers: jwtHeader})
    .then((response) => {
      return response.data;
    })
    .catch(err => {
      return({"error": err.response.data})
    })
}

export {registerUser, loginUser, getUser, followProfileUser}