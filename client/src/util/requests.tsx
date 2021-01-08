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

const followProfileUser = async (username: String) => {
  return await axios
    .post('http://localhost:4000/users/follow', {username}, {headers: jwtHeader})
    .then((response) => {
      return response.data;
    })
    .catch(err => {
      return({"error": err.response.data})
    })
}

const getPostsByUsername = async (username: String) => {
  return await axios
    .get(`http://localhost:4000/posts/u/${username}`)
    .then((response) => {
      return response.data;
    })
    .catch(err => {
      return({"error": err.response.data})
    })
}

const updateProfile = async (info: UserUpdateInfo, username: String) => {
  return await axios
    .put(`http://localhost:4000/users/${username}`, info, {headers: jwtHeader})
    .then((response) => {
      return response.data;
    })
    .catch(err => {
      return({"error": err.response.data})
    })
}

const getHabitPhrase = async () => {
  return await axios
    .get(`https://type.fit/api/quotes`)
    .then((response) => {
      return response.data;
    })
    .catch(err => {
      return({"error": err.response.data})
    })
}

const createHabit = async (habit: UserHabitInput) => {
  return await axios
    .post('http://localhost:4000/habits/create', habit, {headers: jwtHeader})
    .then((response) => {
      return response.data;
    })
    .catch(err => {
      return({"error": err.response.data})
    })
}

const updateHabit = async (habit_id: string, habit: UserHabitInput ) => {
  return await axios
    .put(`http://localhost:4000/habits/${habit_id}`, habit, {headers: jwtHeader})
    .then((response) => {
      return response.data;
    })
    .catch(err => {
      return({"error": err.response.data})
    })
}

const updateHabitStreak = async (habit_id: string) => {
  return await axios
    .put(`http://localhost:4000/habits/${habit_id}/streak`, {}, {headers: jwtHeader})
    .then((response) => {
      return response.data;
    })
    .catch(err => {
      return({"error": err.response.data})
    })
}

const deleteHabit = async (habit_id: string) => {
  return await axios
    .delete(`http://localhost:4000/habits/${habit_id}`, {headers: jwtHeader})
    .then((response) => {
      return response.data;
    })
    .catch(err => {
      return({"error": err.response.data})
    })
}

const getAllPosts = async () => {
  return await axios
    .get(`http://localhost:4000/posts`)
    .then((response) => {
      return response.data;
    })
    .catch(err => {
      return({"error": err.response.data})
    })
}

const getOnePost = async (post_id: string) => {
  return await axios
    .get(`http://localhost:4000/posts/${post_id}`)
    .then((response) => {
      return response.data;
    })
    .catch(err => {
      return({"error": err.response.data})
    })
}

const likePost = async (post_id: string) => {
  return await axios
    .put(`http://localhost:4000/posts/like/${post_id}`, {}, {headers: jwtHeader})
    .then((response) => {
      return response.data;
    })
    .catch(err => {
      return({"error": err.response.data})
    })
}

const createPost = async (post: UserPostInput) => {
  return await axios
    .post('http://localhost:4000/posts/create', post, {headers: jwtHeader})
    .then((response) => {
      return response.data;
    })
    .catch(err => {
      return({"error": err.response.data})
    })
}

const deletePost = async (post_id: string) => {
  return await axios
    .delete(`http://localhost:4000/posts/${post_id}`, {headers: jwtHeader})
    .then((response) => {
      return response.data;
    })
    .catch(err => {
      return({"error": err.response.data})
    })
}

const deleteComment = async (c_id: string, p_id: string) => {
  return await axios
    .post(
      "http://localhost:4000/comments/delete",
      { comment_id: c_id, post_id: p_id },
      { headers: jwtHeader }
    )
    .then((response) => {
      return response.data;
    })
    .catch((err) => {
      return { error: err.response.data };
    });
}

const createComment = async (body: string, p_id: string) => {
  return await axios
    .post(
      "http://localhost:4000/comments/",
      { body, post_id: p_id },
      { headers: jwtHeader }
    )
    .then((response) => {
      return response.data;
    })
    .catch((err) => {
      return { error: err.response.data };
    });
}

const top5Followers = async () => {
  return await axios
    .get( 
      "http://localhost:4000/users/top/followers"
    )
    .then((response) => {
      return response.data;
    })
    .catch((err) => {
      return { error: err.response.data };
    });
}

export {
  registerUser, loginUser, getUser, followProfileUser, getPostsByUsername, updateProfile,
  getHabitPhrase, createHabit, updateHabitStreak, updateHabit, deleteHabit, getAllPosts,
  likePost, createPost, getOnePost, deleteComment, createComment, deletePost, top5Followers
};