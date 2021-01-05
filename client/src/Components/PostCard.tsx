import React from "react";
import LikeButton from "../Components/LikeButton";
import { Card, Button, Label, Icon, Image, Embed } from "semantic-ui-react";
import { Link } from "react-router-dom";
import "../Css/Posts.css";

const moment = require("moment");
const PostCard: React.FC<{ post: PostInfo, user: UserInfo }> = ({ post, user }) => {
  return (
    <Card fluid>
      <Card.Content textAlign="left">
        <Card.Meta as={Link} to={`/u/${post.username}`} >
          Posted by u/{post.username} ⌛ {moment(post.createdAt).fromNow()}{" "}
        </Card.Meta>
        <Card.Header id="timeless-font" style={{ marginTop: "5px" }}>
          {post.title}
        </Card.Header>
        {post.description && (
          <Card.Description style={{ fontSize: "15px" }}>
            {post.description}
          </Card.Description>
        )}
      </Card.Content>
      {post.imageUrl && (
        <Image src={post.imageUrl} style={{ marginTop: "15px" }} />
      )}
      {post.videoUrl && (
        <Embed
          icon="play circle"
          placeholder="https://i.imgur.com/zbiAMac.jpg"
          url={post.videoUrl}
        />
      )}
      <Card.Content extra>
        <LikeButton post={post} user={user} />
        <Button
          floated="left"
          style={{ marginLeft: "10px" }}
          labelPosition="right"
          as={Link}
          to={`/posts`}
        >
          <Button color="blue" basic>
            <Icon name="comments" />
          </Button>
          <Label basic color="blue" pointing="left" id='timeless-font'>
            {post.comments.length}
          </Label>
        </Button>
      </Card.Content>
    </Card>
  );
};

export default PostCard;
