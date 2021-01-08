import React, { useEffect, useState, useContext } from "react";
import { Link, useParams } from "react-router-dom";
import { getOnePost, getUser, deletePost } from "../util/requests";
import "../Css/Posts.css";
import { AuthContext } from "../util/auth";
import {Segment, Card, Image, Embed, Button, Icon, Confirm, Grid} from "semantic-ui-react";
import { useHistory } from 'react-router-dom'

import LikeButton from "../Components/LikeButton";
import Comments from "../Components/Comments"

const moment = require("moment");
const PostPage: React.FC = () => {
  let history = useHistory()
  const { user } = useContext(AuthContext);
  const [openConfirm, setOpenConfirm] = useState<boolean>(false)
  const [fetchPost, setFetchPost] = useState<boolean>(false)
  const { post_id } = useParams<{ post_id: string }>();
  const [postInfo, setPostInfo] = useState<PostInfo>({
    _id: "",
    username: "",
    title: "",
    createdAt: "",
    description: "",
    imageUrl: "",
    videoUrl: "",
    likes: [],
    comments: [],
  });
  const [userInfo, setUserInfo] = useState<UserInfo>({
    username: "",
    email: "",
    imageUrl: "",
    createdAt: "",
    followers: [],
    following: [],
    habits: [],
  });

  useEffect(() => {
    async function getPostInfo() {
      const post = await getOnePost(post_id);
      setPostInfo(post);
    }
    async function getUserInfo() {
      if(postInfo.username) {
        const user = await getUser(postInfo.username);
        setUserInfo(user);
      }
    }
    getPostInfo();
    getUserInfo();
  }, [post_id, postInfo.username, fetchPost]);

  const fetchUserPost = () => {
    setFetchPost(!fetchPost)
  }

  const deleteUserPost = async () => {
    await deletePost(postInfo._id)
    history.push(`/u/${postInfo.username}`)
  }

  return (
    <div>
      <Segment id="postsCover" style={{height: '980px'}}>
        <Card id="postPageCard">
          <Card.Content textAlign="left">
            <Card.Meta as={Link} to={`/u/${postInfo.username}`}>
              Posted by u/{postInfo.username} ⌛{" "}
              {moment(postInfo.createdAt).fromNow()}{" "}
            </Card.Meta>
            <Card.Header id="timeless-font" style={{ marginTop: "5px" }}>
              {postInfo.title}
            </Card.Header>
            {postInfo.description && (
              <Card.Description style={{ fontSize: "15px" }}>
                <div
                  dangerouslySetInnerHTML={{
                    __html: postInfo.description,
                  }}
                ></div>
              </Card.Description>
            )}
          </Card.Content>
          {postInfo.imageUrl && (
            <Image src={postInfo.imageUrl} style={{ marginTop: "15px" }} />
          )}
          {postInfo.videoUrl && (
            <Embed
              icon="play circle"
              placeholder="https://i.imgur.com/zbiAMac.jpg"
              url={postInfo.videoUrl}
            />
          )}
          <Card.Content extra>
            {userInfo.username && (
              <LikeButton post={postInfo} user={userInfo} />
            )}
            {user && user.username === postInfo.username && (
              <div>
                <Button
                  color="red"
                  style={{ "margin-left": "10px" }}
                  onClick={() => setOpenConfirm(true)}
                >
                  <Icon name="trash" />
                  Delete Post
                </Button>
                <Confirm
                  open={openConfirm}
                  onCancel={() => setOpenConfirm(false)}
                  onConfirm={() => deleteUserPost()}
                />
              </div>
            )}
          </Card.Content>
        </Card>
        
        <Card id="formCard" style={{overflow: 'auto', maxHeight: 350 }}>
          <Comments post={postInfo} fetchUserPost={fetchUserPost} />
        </Card>
      </Segment>
    </div>
  );
};

export default PostPage;
