import React, { useEffect, useState } from "react";
import { Button, Icon, Label } from "semantic-ui-react";
import { Link } from "react-router-dom";
import '../Css/Posts.css'
import { likePost } from '../util/requests'

const LikeButton: React.FC<{ post: PostInfo; user: UserInfo }> = ({post,user}) => {
  const [liked, setLiked] = useState<boolean>(false);
  const [likeCount, setLikeCount] = useState<number>(post.likes.length)

  useEffect(() => {
    if (
      user &&
      post.likes.find((like: any) => like.username === user.username)
    ) {
      setLiked(true);
    } else setLiked(false);
  }, [post.likes, user]);

  const setLikePost = async () => {
    const res = await likePost(post._id)
    setLikeCount(res.likes.length)
    setLiked(!liked)
  }

  const likeBtn = user ? (
    liked ? (
      <Button color="red">
        <Icon name="heart" />
      </Button>
    ) : (
      <Button color="red" basic>
        <Icon name="heart" />
      </Button>
    )
  ) : (
    <Button color="red" basic as={Link} to="/login">
      <Icon name="heart" />
    </Button>
  );

  return (
    <Button as="div" floated="left" labelPosition="right" onClick={setLikePost}>
      {likeBtn}
      <Label basic color="red" pointing="left" id='timeless-font'>
        {likeCount}
      </Label>
    </Button>
  );
};

export default LikeButton;
